import React, {Component} from 'react';
import {loadPlayerData, updateUser} from "../../UserFunctions";
import jwt_decode from 'jwt-decode';

class ProfilePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            newPassword: '',
            password: '',
            jerseyNumber: 0,
            height: 0,
            weight: 0,
            isAdmin: 0,
            isFormer: 0,
            players: [],
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    componentDidMount() {
        loadPlayerData(localStorage.id)
            .then(response => {
                const decoded = jwt_decode(localStorage.playertoken);
                this.setState({
                    username: decoded.username,
                    firstName: decoded.firstName,
                    lastName: decoded.lastName,
                    jerseyNumber: decoded.jerseyNumber,
                    height: decoded.height,
                    weight: decoded.weight,
                    isFormer: decoded.isFormer,
                    isAdmin: decoded.isAdmin
                })})
                .catch(err => console.log(err));

    }

    onSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            username: this.state.username,
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
                                name="password"
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
                        <div className="form-group">
                            <label htmlFor="isFormer">Former</label>
                            <input
                                className="form-control"
                                name="isFormer"
                                type="checkbox"
                                value={this.state.isFormer}
                                onChange={this.onChange}
                                checked={this.state.isFormer === 1 ? 'checked' : null}

                            />
                            <label htmlFor="isAdmin">Admin</label>
                            <input
                                className="form-control"
                                name="isAdmin"
                                type="checkbox"
                                value={this.state.isFormer}
                                onChange={this.onChange}
                                checked={this.state.isAdmin === 1 ? 'checked' : null}
                            />

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