import React, { Component } from 'react';
import { register } from '../../UserFunctions'
import {toast} from "react-toastify";

class RegistrationPage extends Component {


    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            jerseyNumber: 0,
            height: 0,
            weight: 0,
            isFormer: 0,
            isAdmin: 0,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick(e) {
        this.setState({[e.target.name]: 1})
    }

    onSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            jerseyNumber: this.state.jerseyNumber,
            height: this.state.height,
            weight: this.state.weight,
            isFormer: this.state.isFormer,
            isAdmin: this.state.isAdmin,
        };

        register(newPlayer).then(res => {
            if (res) {
                this.props.history.push('/');
            }
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="nBrand">BULLDOGS</h1>
                <h3>!For test purposes only!</h3>

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-4 rounded border">
                        <form onSubmit={this.onSubmit} className="m-3">
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    className="form-control"
                                    name="username"
                                    placeholder="Enter your Username"
                                    value={this.state.username}
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
                                    placeholder="Enter your Password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    placeholder="Enter your First Name"
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
                                <label htmlFor="jerseyNumber">Jersey Number</label>
                                <input
                                    className="form-control"
                                    name="jerseyNumber"
                                    placeholder="Enter your Jersey Number"
                                    value={this.state.jerseyNumber}
                                    onChange={event => this.setState({jerseyNumber: event.target.value.replace(/\D/,'')})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="height">Height</label>
                                <input
                                    className="form-control"
                                    name="height"
                                    placeholder="Enter your height"
                                    value={this.state.height}
                                    onChange={event => this.setState({height: event.target.value.replace(/\D/,'')})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weight">Weight</label>
                                <input
                                    className="form-control"
                                    name="weight"
                                    placeholder="Enter your weight"
                                    value={this.state.weight}
                                    onChange={event => this.setState({weight: event.target.value.replace(/\D/,'')})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="isFormer">Former</label>
                                <input
                                    className="form-control"
                                    name="isFormer"
                                    type="checkbox"
                                    onClick={this.onClick}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="isAdmin">Admin</label>
                                <input
                                    className="form-control"
                                    name="isAdmin"
                                    type="checkbox"
                                    onClick={this.onClick}
                                />
                            </div>

                            <button type="submit" className="btn btn-bulldogs">Register</button>

                        </form>

                    </div>
                </div>

            </div>
        );
    }
}

export default RegistrationPage;