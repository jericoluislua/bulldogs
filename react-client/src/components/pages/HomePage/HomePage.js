import React, { Component } from 'react';
import { login } from '../../UserFunctions'
import './HomePage.css';
import {toast} from "react-toastify";

class HomePage extends Component {

    succ = () => toast.success("Welcome " + localStorage.username + "!",
        {
            position: toast.POSITION.BOTTOM_LEFT
    });
    unsucc = () => toast.error("Wrong credentials!",
        {
            position: toast.POSITION.BOTTOM_LEFT
        });

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
        if (!this.state.username || !this.state.password || !this.state.username && !this.state.password){
            this.unsucc();
        }else {
            login(player).then(res => {

                if (res) {
                    this.props.history.push('/');
                    this.succ();
                }
            })
                .catch(err => {
                    this.unsucc();
                    this.setState({
                        errors: err,
                    })
                })
        }
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
                <div className="col-lg-3 col-md-5 rounded border">
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
                <h3>Welcome {localStorage.playertoken ? localStorage.username : null}!</h3>
                {localStorage.playertoken ? loggedInText : nLoggedInText}
                {!localStorage.playertoken ? logInForm : null}


            </div>
        );
    }
}

export default HomePage;