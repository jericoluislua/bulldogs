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
           p_id: this.state.p_id
        };

        console.log("chosen id is: " + player);

        /*deletePlayer(player).then(res => {

            if (res) {
                this.props.history.push('/');
                console.log("Successfully deleted user: " + this.state.username)
            }
        })*/
    }

    handleDelete(e, p_id){
        deletePlayer(p_id).then(res => {

            if (res) {
                console.log("Successfully deleted user: " + this.state.username)
                this.props.history.push('/players');
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
        const boolAdmin = (localStorage.isAdmin === "0");
        let chosen_p_id = 0;

        return <div className="container">
            <h1>Players</h1>
            {this.state.players.map((p, id) =>
                <div className="col-lg-5 m-auto" key={id}>
                    <div className="card-bulldogs card mt-5 mb-5" key={id}>
                        <div className="card-header">{p.username}</div>
                        <div className="card-body">

                            <p><i className="font-weight-bold">Name: </i>{p.firstName + " " + p.lastName}</p>
                            <p><i className="font-weight-bold">Jersey Number: </i>{p.jerseyNumber}</p>
                            <p><i className="font-weight-bold">Height: </i>{p.height}cm</p>
                            <p><i className="font-weight-bold">Weight: </i>{p.weight}kg</p>
                        </div>

                        <div className="card-footer">



                            <button className="btn-bulldogs btn" disabled={boolAdmin}>hi</button>
                            <button className="btn-bulldogs btn"
                                    disabled={boolAdmin} onClick={e => this.handleDelete(e, p.p_id)}>delete</button>

                        </div>
                        {/*{boolAdmin ? this.setState(chosen_p_id=p.p_id) : null}*/}

                    </div>
                </div>
            )}

        </div>
    }
}

export default PlayersPage;