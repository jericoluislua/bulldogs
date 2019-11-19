import axios from 'axios';

export const register = newPlayer => {
    return axios
        .post('players/register', {
            username: newPlayer.username,
            password: newPlayer.password,
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            jerseyNumber: newPlayer.jerseyNumber
        })
        .then(response => {
            console.log("Succesfully registered: " + newPlayer.username)
        });
};

export const login = player => {
    return axios
        .post('players/login', {
            username: player.username,
            password: player.password
        })
        .then(response => {
            localStorage.setItem('playertoken', response.data);
            return response.data;
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};