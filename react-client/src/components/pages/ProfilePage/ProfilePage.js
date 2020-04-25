import React, {Component} from 'react';
import {loadPlayerData, updateUser} from "../../UserFunctions";
import jwt_decode from 'jwt-decode';

class ProfilePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            players: {
                firstName: '',
                lastName: '',
                newPassword: '',
                password: '',
                jerseyNumber: '',
                height: '',
                weight: '',
                isFormer: 0,
                isAdmin: 0},
            errors: {}
        };
        if (localStorage.isAdmin === '1'){
            this.state = {isAdmin: 0};
        }

        this.onChangeCheckbox = this.onChangeCheckbox.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangeCheckbox(e){
        if (e.target.name === "isFormer"){
            if (this.state.isFormer === 0){
                this.setState({[e.target.name]: 1});
            }else if (this.state.isFormer === 1){
                this.setState({[e.target.name]: 0});
            }
        }
        else if (e.target.name === "isAdmin"){
            if (this.state.isAdmin === 0){
                this.setState({[e.target.name]: 1});
            }else if (this.state.isAdmin === 1){
                this.setState({[e.target.name]: 0});
            }
        }
    }

    componentDidMount(e) {
        loadPlayerData(localStorage.id)
            .then(() => {
                const decoded = jwt_decode(localStorage.playertoken);
                this.setState({
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    jerseyNumber: decoded.jerseyNumber,
                    height: decoded.height,
                    weight: decoded.weight,
                    isFormer: decoded.isFormer

                });
                if (localStorage.isAdmin === '1'){
                    this.setState({isAdmin: decoded.isAdmin});
                }
            })
                .catch(err => console.log(err));

    }

    onSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            password: this.state.password,
            newPassword: this.state.newPassword,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            jerseyNumber: this.state.jerseyNumber,
            weight: this.state.weight,
            height: this.state.height,
            isFormer: this.state.isFormer,
            isAdmin: this.state.isAdmin
        };

        updateUser(newPlayer).then(res => {
            if (res) {
                this.props.history.push('/')
            }
        })
    }

    render() {




        return <div className="container">
            <h1 className="mt-1">Profile</h1>
            <div className="col-lg-5 m-auto">
            <div className="card card-bulldogs mt-5 mb-5">
                <div className="card-header">{this.state.username}</div>
                <div className="card-body">
                    <form onSubmit={this.onSubmit} className="m-3">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                className="form-control"
                                name="firstName"
                                placeholder=''
                                value={this.state.firstName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                className="form-control"
                                name="lastName"
                                placeholder="Enter your Last Name"
                                value={this.state.lastName}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="newPassword"
                                placeholder="Enter your new Password"
                                value={this.state.newPassword}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Enter your old Password"
                                value={this.state.password}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jerseyNumber">Jersey Number</label>
                            <input
                                className="form-control"
                                name="jerseyNumber"
                                placeholder="Enter your Jersey Number"
                                value={this.state.jerseyNumber}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="height">Height</label>
                            <input
                                className="form-control"
                                name="height"
                                placeholder="Enter your height"
                                value={this.state.height}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weight">Weight</label>
                            <input
                                className="form-control"
                                name="weight"
                                placeholder="Enter your weight"
                                value={this.state.weight}
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group row">
                            <div className="col-lg-6 col-md-6">
                                <label htmlFor="isFormer">Former</label>
                                <input
                                    className="form-control"
                                    name="isFormer"
                                    type="checkbox"
                                    checked={this.state.isFormer}
                                    onChange={this.onChangeCheckbox}

                                />
                            </div>
                            {localStorage.isAdmin === "1" ?
                                <div className="col-lg-6 col-md-6">
                                    <label htmlFor="isAdmin">Admin</label>
                                    <input
                                        className="form-control"
                                        name="isAdmin"
                                        type="checkbox"
                                        checked={this.state.isAdmin === 1 ? 'checked' : null}
                                        onChange={this.onChangeCheckbox}
                                    />
                                </div> : null
                            }


                        </div>

                        <button type="submit" className="btn btn-bulldogs" >Update</button>

                    </form>
                </div>
            </div>
        </div>

        </div>

    }
}

export default ProfilePage;