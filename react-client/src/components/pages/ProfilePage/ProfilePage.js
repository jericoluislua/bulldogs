import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';


class ProfilePage extends Component {

    constructor(){
        super();
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            jerseyNumber: 0,
            errors: {}
        };
    }

    componentDidMount() {
        const token = localStorage.playertoken;
        const decoded = jwt_decode(token);
        this.setState({
            username: decoded.username,
            firstName: decoded.firstName,
            lastName: decoded.lastName,
            jerseyNumber: decoded.jerseyNumber
        });
    }

    render() {
        return (
            <div className="container">
                {/*to be added: instead of "Player" it will be the player's first name*/}
                <h1>Profile</h1>

            </div>
        );
    }
}

export default ProfilePage;