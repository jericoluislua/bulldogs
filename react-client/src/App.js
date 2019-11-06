import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";

class App extends Component{

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
    }
}

export default App;
