import React, { Component } from 'react';
import axios from "axios";
import './HomePage.css';

export default class HomePage extends Component {

    state = {
        players: [],
        player: {
             username: '',
              password: '',
              firstName: '',
              lastName: '',
              jerseyNumber: ''
        }
    };




    componentDidMount()
    {
        this.getPlayers();
    }

    getPlayers = _ => {
        fetch('http://localhost:4000/players')
            .then(response => response.json())
            .then(response => this.setState({players: response.data}))
            .catch(err => console.error(err));

    };

    renderPlayer = ({p_id, username}) => <div key={p_id}>{username}</div>;

    render() {
        const { players, player } = this.state;
        return (
            <div className="container">
                <h1 className="nBrand">BULLDOGS</h1>
                <h3>Welcome!</h3>
                <h4>In here you will be able to track your training progress, match stats and body comparisons</h4>

                {players.map(this.renderPlayer)}


                {/*
                <h1>Status: {this.props.loggedInStatus}</h1>
                <div className="row d-flex justify-content-center">


                        <div className="col-lg-3 rounded border">
                            <form onSubmit={this.handleSubmit} className="m-3">
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        className="form-control"
                                        id="homeUsername"
                                        name="username"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>

                                    <input
                                        className="form-control"
                                        id="homePassword"
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-bulldogs">Log In</button>

                            </form>

                        </div>




                </div>*/}
            </div>
        );
    }
}
