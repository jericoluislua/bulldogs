//rcjc for automatic class creation
import './Navbar.css';
import React from 'react';
import bulldogsFont from '../../fonts/aspire-smallcaps/AspireSC-Regular.ttf';
function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand text-uppercase center" id="nBrand" href="#">Bulldogs</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"/>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link text-uppercase" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link text-uppercase" href="#">Link</a>
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