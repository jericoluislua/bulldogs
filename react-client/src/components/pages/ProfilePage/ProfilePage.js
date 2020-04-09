import React, {Component} from 'react';
import {loadPlayerData, register, updateUser} from "../../UserFunctions";


class ProfilePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            p_id: 0,
            username: localStorage.username,
            firstName: '',
            lastName: '',
            newPassword: '',
            password: localStorage.password,
            jerseyNumber: null,
            height: null,
            weight: null,
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
        /*const decoded = jwt_decode(window.$userToken);
        console.log(decoded);
        this.setState({
            username: decoded.username,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            jerseyNumber: decoded.jerseyNumber
        });*/
        loadPlayerData().then(response => {
            this.setState({players: response.data.data})
        })
            .catch(err => console.log(err));
    };


    onSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            jerseyNumber: this.state.jerseyNumber,
            weight: this.state.weight,
            height: this.state.height
        };

        updateUser(newPlayer).then(res => {
            if (res) {
                this.props.history.push('/')
            }
        })
    }

    render() {

        return <div className="container">
            {console.log(this.state.players)}
            <h1 className="mt-1">Profile</h1>
            {this.setState(state => ({
                 players: state.players.map(p => {
                        if(localStorage.username === p.username){
                            state.p_id = p.p_id;
                            state.username = p.username;
                            state.password = p.password;
                            state.firstName = p.firstName;
                            state.lastName = p.lastName;
                            state.jerseyNumber = p.jerseyNumber;
                            state.height = p.height;
                            state.weight = p.weight;
                            state.isFormer = p.isFormer;
                            state.isAdmin = p.isAdmin;
                        }

                    })}))}

                        {/*p_id:p.p_id,
                        username: p.username,
                        password: p.password,
                        firstName: p.firstName,
                        lastName: p.lastName,
                        jerseyNumber: p.jerseyNumber,
                        height: p.height,
                        weight: p.weight,
                        isFormer: p.isFormer,
                        isAdmin: p.isAdmin*/}

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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jerseyNumber">Height</label>
                            <input
                                className="form-control"
                                name="jerseyNumber"
                                placeholder="Enter your height"
                                value={this.state.height}
                                onChange={this.onChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="jerseyNumber">Weight</label>
                            <input
                                className="form-control"
                                name="jerseyNumber"
                                placeholder="Enter your weight"
                                value={this.state.weight}
                                onChange={this.onChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-bulldogs">Update</button>

                    </form>
                </div>
            </div>
        </div>
            {console.log("Fullname " + this.state.firstName + " " + this.state.lastName)}
        </div>

    }
}

export default ProfilePage;