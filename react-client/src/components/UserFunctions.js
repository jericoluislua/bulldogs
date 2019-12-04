import axios from 'axios';

export const register = newPlayer => {
    return axios
        .post('/users/register', {
            username: newPlayer.username,
            password: newPlayer.password,
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            jerseyNumber: newPlayer.jerseyNumber
        }).catch(err => {
            console.log(err);
        })
        .then(response => {
            console.log("Succesfully registered: " + newPlayer.username + " " + newPlayer.password)
        });
};

export const login = player => {
    return axios
        .post('/users/login', {
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