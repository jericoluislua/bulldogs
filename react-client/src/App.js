import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";

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
            loggedInStatus: "NOT_LOGGED_IN",
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
                            <HomePage {...props} loggedInStatus={this.state.loggedInStatus}/>
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




/*
state = {
    players: [],
    player: {
        // username: 'flaxh13',
        //  password: 'Bulldogs12345',
        //  firstName: 'Florian',
        //  lastName: 'Axhanela',
        //  jerseyNumber: '13'
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

addPlayer = _ => {
    const { player } = this.state;
    fetch(`http://localhost:4000/players/add?username=
        ${player.username}&password=${player.password}&firstName=${player.firstName}&lastName=${player.lastName}&jerseyNumber=${player.jerseyNumber}`)
        .then(this.getPlayers)
        .catch(err => console.error(err))
};

renderPlayer = ({p_id, username}) => <div key={p_id}>{username}</div>;

render(){
    const { players, player } = this.state;
    return (
        <div className="App">
            <Navbar/>
            {players.map(this.renderPlayer)}

            <div>
                <input
                    value={player.username}
                    onChange={e => this.setState({ player: {...player, username: e.target.value}})}
                />
                <input
                    value={player.password}
                    onChange={e => this.setState({ player: {...player, password: e.target.value}})}
                />
                <input
                    value={player.firstName}
                    onChange={e => this.setState({ player: {...player, firstName: e.target.value}})}
                />
                <input
                    value={player.lastName}
                    onChange={e => this.setState({ player: {...player, lastName: e.target.value}})}
                />
                <input
                    value={player.jerseyNumber}
                    onChange={e => this.setState({ player: {...player, jerseyNumber: e.target.value}})}
                />
                <button onClick={this.addPlayer}>Add Player</button>
            </div>
        </div>
    );
}*/
