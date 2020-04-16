import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//React Router Import
import { Switch, Route, Redirect } from 'react-router-dom';

//Import Pages
import HomePage from "./components/pages/HomePage/HomePage";
import HeightDifferencePage from "./components/pages/HeightDifferencePage/HeightDifferencePage";
import WeightDifferencePage from "./components/pages/WeightDifferencePage/WeightDifferencePage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import NotFoundPage from "./components/NotFoundPage";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";
import PlayersPage from "./components/pages/PlayersPage/PlayersPage";

//Only logged in players can reach these pages
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest}
           render={(props) => (
               localStorage.playertoken
                   ? <Component{...props} />
                   : <Redirect to='/' />
           )} />
);

//Only Admins can reach this/these pages
const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest}
           render={(props) => (
               localStorage.playertoken
                   ?
                   localStorage.isAdmin === '1'
                       ? <Component{...props} />
                       : <Redirect to='/' />
                   : <Redirect to='/' />
           )} />
);


export default class App extends Component{

    constructor() {
        super();

        this.state = {
            user: {}
        }
    }

    render() {

        return(
            <div className="App">
                <Navbar/>
                <ToastContainer/>
                <Switch>
                    <Route
                        exact
                        path={"/"}
                        render={props => (
                            <HomePage {...props}/>
                            )}
                    />
                    <PrivateRoute path="/height-difference" component={HeightDifferencePage}/>
                    <PrivateRoute path="/weight-difference" component={WeightDifferencePage}/>
                    <PrivateRoute path="/profile" component={ProfilePage}/>
                    <PrivateRoute path="/players" component={PlayersPage}/>
                    <AdminRoute path="/register" component={RegistrationPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        );
    }

}