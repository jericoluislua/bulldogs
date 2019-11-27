import React, { Component } from 'react';
import { login } from '../../UserFunctions'
import './HomePage.css';

class HomePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
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

        const player = {
            username: this.state.username,
            password: this.state.password
        };

        login(player).then(res => {
            if (res) {
                this.props.history.push('/')
            }
        })
    }

    render() {

        const nLoggedInText = (
            <h4>Please Log in.</h4>
        );

        const loggedInText = (
            <div>
                <h4>In here you will be able to track your training progress, match stats and body comparisons.</h4>
                <h4>You may now begin tracking your progress have fun!</h4>
            </div>
        );

        const logInForm = (
            <div className="row d-flex justify-content-center">
                <div className="col-lg-3 rounded border">
                    <form onSubmit={this.onSubmit} className="m-3">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                className="form-control"
                                name="username"
                                placeholder="username"
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
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-bulldogs">Log In</button>

                    </form>

                </div>
            </div>
        );


        return (
            <div className="container">
                <h1 className="nBrand">BULLDOGS</h1>
                <h3>Welcome {}!</h3>
                {localStorage.playertoken ? loggedInText : nLoggedInText}

                {!localStorage.playertoken ? logInForm : null}


            </div>
        );
    }
}

export default HomePage;