//rcc for automatic class creation
import React, { Component } from 'react';
import {Link, NavLink, withRouter} from "react-router-dom";
import {toast} from "react-toastify";
import './Navbar.css';

class Navbar extends Component{
    logoutSucc = () => toast.success('Logged out successfully.',
        {
            position: toast.POSITION.BOTTOM_LEFT
        });

    logOut(e){
        e.preventDefault();
        localStorage.removeItem('playertoken');
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        this.logoutSucc();
        this.props.history.push('/');
    }

    render() {


        const loggedIn = (
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto nav-tabs">
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link text-uppercase" to="profile">Profile</NavLink>
                    </li>
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link text-uppercase" to="height-difference">Height difference</NavLink>
                    </li>
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link text-uppercase" to="weight-difference">Weight difference</NavLink>
                    </li>
                    {localStorage.isAdmin === '1'
                        ?   <li className="nav-item mr-2">
                                <NavLink className="nav-link text-uppercase" to="/register">Register</NavLink>
                            </li> : null}
                    <li className="nav-item mr-2">
                        <NavLink className="nav-link text-uppercase" to="/players">Players</NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="/" className="nav-link text-uppercase" onClick={this.logOut.bind(this)}>Logout</a>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control col-md-7 ml-sm-auto mr-sm-2 " type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-light text-uppercase mr-sm-auto" type="submit">Search</button>
                </form>
            </div>

        );

        return(
            <nav className="navbar navbar-expand-xxl navbar-light" style={{backgroundColor: '#de230e'}}>
                <Link className="navbar-brand text-uppercase center nBrand" to="">Bulldogs</Link>
                {localStorage.playertoken
                    ?
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    : null
                }

                {localStorage.playertoken ? loggedIn : null}
            </nav>
        );
    }
}
export default withRouter(Navbar);