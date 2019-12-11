import React, {Component} from 'react';
import jwt_decode from 'jwt-decode';


class ProfilePage extends Component {

    constructor(props){
        super(props);
        this.state = {
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

    componentDidMount() {
        try{
            const decoded = jwt_decode(window.$userToken);
            console.log(decoded);
            this.setState({
                username: decoded.username,
                firstName: decoded.firstName,
                lastName: decoded.lastName,
                jerseyNumber: decoded.jerseyNumber
            });
        }catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <div className="container">
                {/*to be added: instead of "Player" it will be the player's first name*/}
                <h1>Profile {this.state.username}</h1>
                <p>{this.state.firstName}</p>

            </div>
        );
    }
}

export default ProfilePage;