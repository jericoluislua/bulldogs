//rcc for automatic class creation
import './Navbar.css';
import React from 'react';
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand text-uppercase center nBrand"  to="">Bulldogs</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="player-stats">Stats <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="height-difference">Height difference</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-uppercase" to="weight-difference">Weight difference</Link>
                    </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-light text-uppercase" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}
export default Navbar;