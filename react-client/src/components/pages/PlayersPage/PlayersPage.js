import React, {Component} from 'react';
import {loadAllPlayerData, removePlayer} from "../../UserFunctions";
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

        this.modalRemovePlayer = this.modalRemovePlayer.bind(this);
        /*this.reloadData = this.reloadData(this);*/
    }

    reloadData = () => {
        loadAllPlayerData().then(response => {
            this.setState({players: response.data.data});
        })
            .catch(err => console.log(err));
    };

    modalRemovePlayer(e, username){
        e.preventDefault();

        removePlayer(username).then(res => {

            if (res) {
                this.reloadData();
            }
        })
    }


    componentDidMount() {
        this.reloadData();
        setInterval(this.reloadData, 20000);
    }


    render() {
        const boolAdmin = (localStorage.isAdmin === "1");
        const isAdmin = (p) => {
            return (
            <div className="card-footer">
                <button className="btn-bulldogs btn" data-toggle="modal" data-target={'#modalEdit'+p.p_id}>Edit</button>
                <button className="btn-bulldogs btn" data-toggle="modal" data-target={'#modalRemoveConfirmation'+p.p_id}>Remove</button>

            </div>)
        };

        const modalRemove = (p) => {
            return (
                <div className="modal fade" id={'modalRemoveConfirmation'+p.p_id} tabIndex="-1" role="dialog"
                     aria-labelledby="modalRemoveLabelConfirmation" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalRemoveLabelConfirmation">Remove {p.firstName}?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-bulldogs" onClick={e => this.modalRemovePlayer(e, p.username)} data-dismiss="modal" aria-label="Close">Remove</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        };

        const modalEdit = (p) => {
            return (
                <div className="modal fade" id={'modalEdit'+p.p_id} tabIndex="-1" role="dialog"
                     aria-labelledby="modalEditLabel" aria-hidden="true" >
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalEditLabel">Edit {p.username}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-footer d-flex">
                                <div className="d-flex justify-content-start">
                                    <button type="button" className="btn btn-bulldogs" onClick={e => this.modalRemovePlayer(e, p.username)} data-dismiss="modal" aria-label="Close">Revert<br/>password</button>
                                    <button type="button" className="btn btn-bulldogs" onClick={e => this.modalRemovePlayer(e, p.username)} data-dismiss="modal" aria-label="Close">Make<br/>Admin</button>
                                    <button type="button" className="btn btn-bulldogs" onClick={e => this.modalRemovePlayer(e, p.username)} data-dismiss="modal" aria-label="Close">Make<br/>Former</button>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
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
                            {modalRemove(p)}
                            {modalEdit(p)}
                        </div>
                        {boolAdmin ? (isAdmin(p)) : null}



                    </div>
                </div>
            )}

        </div>
    }
}

export default PlayersPage;