//rcc for automatic class creation
import './Navbar.css';
import React, { Component } from 'react';
import {Link, NavLink, withRouter} from "react-router-dom";


class Navbar extends Component{

    logOut(e){
        e.preventDefault();
        localStorage.removeItem('playertoken');
        localStorage.removeItem('username');
        this.props.history.push('/');
    }

    render() {

        const nLoggedIn = (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                </ul>
            </div>
        );

        const loggedIn = (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="profile">Profile</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="height-difference">Height difference</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="weight-difference">Weight difference</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link text-uppercase" to="/register">Register</NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link text-uppercase" onClick={this.logOut.bind(this)}>Logout</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-light text-uppercase" type="submit">Search</button>
                </form>
            </div>

        );

        return(
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand text-uppercase center nBrand" to="">Bulldogs</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>

                {localStorage.playertoken ? loggedIn : nLoggedIn}
            </nav>
        );
    }
}
export default withRouter(Navbar);