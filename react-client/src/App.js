import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import 'react-toastify/dist/ReactToastify.css';

//React Router Import
import { Switch, Route } from 'react-router-dom';

//Import Pages
import HomePage from "./components/pages/HomePage/HomePage";
import HeightDifferencePage from "./components/pages/HeightDifferencePage/HeightDifferencePage";
import WeightDifferencePage from "./components/pages/WeightDifferencePage/WeightDifferencePage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import NotFoundPage from "./components/NotFoundPage";
import RegistrationPage from "./components/pages/RegistrationPage/RegistrationPage";

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
                <Switch>
                    {/*exact makes homepage the default*/}
                    <Route
                        exact
                        path={"/"}
                        render={props => (
                            <HomePage {...props}/>
                            )}
                    />
                    <Route path="/height-difference" component={HeightDifferencePage}/>
                    <Route path="/weight-difference" component={WeightDifferencePage}/>
                    <Route path="/profile" component={ProfilePage}/>
                    <Route path="/register" component={RegistrationPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        );
    }

}