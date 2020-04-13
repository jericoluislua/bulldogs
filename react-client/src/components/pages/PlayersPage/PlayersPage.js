import React, {Component} from 'react';
import {loadAllPlayerData, deletePlayer} from "../../UserFunctions";
import './PlayersPage.css';

class PlayersPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            p_id: 0,
            username: '',
            firstName: '',
            lastName: '',
            jerseyNumber: null,
            height: null,
            weight: null,
            isAdmin: 0,
            isFormer: 0,
            players: [],
            errors: {}
        };
    }

    onSubmit(e) {
        e.preventDefault();

        const player = {
            username: this.state.username,
            password: this.state.password
        };

        deletePlayer(player).then(res => {

            if (res) {
                this.props.history.push('/');
                console.log("Successfully deleted user: " + this.state.username)
            }
        })
    }


    componentDidMount() {
        /*const decoded = jwt_decode(window.$userToken);
        console.log(decoded);
        this.setState({
            username: decoded.username,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            jerseyNumber: decoded.jerseyNumber
        });*/
        loadAllPlayerData().then(response => {
            this.setState({players: response.data.data});
            console.log(response.data.data)
        })
            .catch(err => console.log(err));
    }


    render() {
        const boolAdmin = (localStorage.isAdmin === "1");
        const isAdmin = (
            <div className="card-footer">
                <button className="btn-bulldogs btn">hi</button>
                <form onSubmit={this.onSubmit}>
                    {<button className="btn-bulldogs btn">delete</button>}
                </form>
            </div>
        );

        return <div className="container">
            <h1>Players</h1>
            {this.state.players.map((p) =>
                <div className="col-lg-5 m-auto">
                    <div className="card-bulldogs card mt-5 mb-5">
                        <div className="card-header">{p.username}</div>
                        <div className="card-body">
                            {console.log("ID: " + p.p_id + "\nUsername: " + p.username)}
                            <p><i className="font-weight-bold">Name: </i>{p.firstName + " " + p.lastName}</p>
                            <p><i className="font-weight-bold">Jersey Number: </i>{p.jerseyNumber}</p>
                            <p><i className="font-weight-bold">Height: </i>{p.height}cm</p>
                            <p><i className="font-weight-bold">Weight: </i>{p.weight}kg</p>
                        </div>


                        {boolAdmin ? isAdmin : null}

                    </div>
                </div>
            )}

        </div>
    }
}

export default PlayersPage;