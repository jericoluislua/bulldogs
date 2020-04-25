import axios from 'axios';
import { toast } from "react-toastify";

const succForm = (succ) => toast.success(succ,
    {
        position: toast.POSITION.BOTTOM_LEFT
    });
const unsuccForm = (unsucc) => toast.error(unsucc,
    {
        position: toast.POSITION.BOTTOM_LEFT
    });

export const register = newPlayer => {
    return axios
        .post('http://localhost:4000/players/register', {
            username: newPlayer.username,
            password: newPlayer.password,
            firstName: newPlayer.firstName,
            lastName: newPlayer.lastName,
            jerseyNumber: newPlayer.jerseyNumber,
            height: newPlayer.height,
            weight: newPlayer.weight,
            isFormer: newPlayer.isFormer,
            isAdmin: newPlayer.isAdmin
        })
        .then(response => {
            succForm("Successfully registered: " + newPlayer.username);
        })
        .catch(err => {
            unsuccForm("Something wrong happened. Please try again.");
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
            succForm("Welcome " + localStorage.username + "!");
            return response.data;

        })
        .catch(err => {
            unsuccForm("Wrong credentials!");
        });
};


export const removePlayer = player => {
    return axios
        .delete(`http://localhost:4000/players/delete/${player}`)
        .then(response => {
            succForm("Successfully removed " + player);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        })
};

export const loadAllPlayerData = player => {
    return axios
        .get('http://localhost:4000/players/', {})
        .then(response => {
            succForm("Loaded all players!");
            return response
        })
        .catch(err => {unsuccForm("Something went wrong while loading the players!")})
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

export const updateUser = (player) => {
    return axios
        .put(`http://localhost:4000/players/update/`, {
            password: player.password,
            firstName: player.firstName,
            lastName: player.lastName,
            jerseyNumber: player.jerseyNumber,
            height: player.height,
            weight: player.weight,
            isFormer: player.isFormer,
            isAdmin: player.isAdmin
        })
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
};