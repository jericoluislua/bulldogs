import React, { Component } from 'react';
import { register } from '../../UserFunctions'

class RegistrationPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            jerseyNumber: 0,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const newPlayer = {
            username: this.state.username,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            jerseyNumber: this.state.jerseyNumber
        };

        register(newPlayer).then(res => {
            if (res) {
                this.props.history.push('/')
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
                                    onChange={this.onChange}
                                    required
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