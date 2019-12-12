import React, {Component} from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


class ProfilePage extends Component {

    constructor(props){
        super(props);
        this.state = {
            players: [],
            p_id: 0,
            username: '',
            firstName: '',
            lastName: '',
            jerseyNumber: null,
            height: null,
            weight: null,
            isAdmin: null,
            isFormer: null,
            errors: {}
        };
    }

    loadUserData() {
        axios
            .get('http://localhost:4000/players', {})
            .then(response => {
                const data = response.data.data;
                let answer = "no";
                console.log(data);
                const players = data.map(p =>
                    <div>
                        {
                            localStorage.username === p.username ? answer = "yes" : console.log("no")
                        }
                        <p>{p.p_id}</p>
                        <p>{p.username}</p>
                        <p>{p.firstName}</p>
                        <p>{p.lastName}</p>
                    </div>
                );
                this.setState({players})
            })
            .catch(err => {
                console.log(err);
                throw err;
            })
    }

    componentDidMount() {
        try{
            /*const decoded = jwt_decode(window.$userToken);
            console.log(decoded);
            this.setState({
                username: decoded.username,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                jerseyNumber: decoded.jerseyNumber
            });*/
            this.loadUserData();
        }catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="container">
                {/*to be added: instead of "Player" it will be the player's first name*/}
                <h1>Profile {}</h1>
                <p>{this.state.players}</p>

            </div>
        );
    }
}

export default ProfilePage;