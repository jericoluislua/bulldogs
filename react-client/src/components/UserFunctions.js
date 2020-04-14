import axios from 'axios';

export const register = newPlayer => {
    return axios
        .post('http://localhost:4000/players/register', {
            username: newPlayer.username,
            password: newPlayer.password,
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            jerseyNumber: newPlayer.jerseyNumber
        })
        .then(response => {
            console.log("Successfully registered: " + newPlayer.username + " " + newPlayer.password);
        })
        .catch(err => {
            console.log(err);
        });
};

export const login = player => {
    return axios
        .post('http://localhost:4000/players/login', {
            username: player.username,
            password: player.password
        })
        .then(response => {
            localStorage.setItem('playertoken', response.data["playertoken"]);
            localStorage.setItem('id', response.data["id"]);
            localStorage.setItem('username', response.data["username"]);
            localStorage.setItem('isAdmin', response.data["isAdmin"]);
            if (localStorage.isAdmin === 1){

            }
            return response.data;

        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};


export const deletePlayer = player => {
    return axios
        .delete(`http://localhost:4000/players/delete/${player}`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err);
        })
};

export const loadAllPlayerData = player => {
    return axios
        .get('http://localhost:4000/players/', {})
};

export const loadPlayerData = id => {
    return axios
        .get('http://localhost:4000/players/', {
            params:{
                p_id: id
            }
        })
        .then(response => {
            console.log("Successfully loaded " + id + "'s profile.");
        })
        .catch(err => {
            console.log(err);
        });
};

export const updateUser = updateData => {
    return axios
        .put('http://localhost:4000/players/update/', {
            params:{
            }
        })
};