import React, {Component} from 'react';
import {loadAllPlayerData, removePlayer} from "../../UserFunctions";
import './PlayersPage.css';
import {toast} from "react-toastify";

class PlayersPage extends Component {

    removePlayerToast = () => toast.success("Succesfully remove");

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

        this.modalRemove = this.modalRemove.bind(this);
    }


    modalRemove(e, p_id){
        e.preventDefault();

        removePlayer(p_id).then(res => {

            if (res) {
                this.removePlayerToast();
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
        const boolAdmin = (localStorage.isAdmin === "1");
        const isAdmin = (p) => {
            return (
            <div className="card-footer">



                <button className="btn-bulldogs btn">hi</button>
                <button className="btn-bulldogs btn" data-toggle="modal" data-target={'#modalConfirmation'+p.p_id}>Remove</button>

            </div>)
        };

/*        const Modal = (p) => {
            return (

            )
        };*/


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
                            <div className="modal fade" id={'modalConfirmation'+p.p_id} tabIndex="-1" role="dialog"
                                 aria-labelledby="modalLabelConfirmation" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="modalLabelConfirmation">Remove {p.firstName}?</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-bulldogs" onClick={e => this.modalRemove(e, p.p_id)}>Remove</button>
                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {boolAdmin ? (isAdmin(p)) : null}



                    </div>
                </div>
            )}

        </div>
    }
}

export default PlayersPage;