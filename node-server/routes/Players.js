const express = require('express');
const players = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require("../models/Player");
players.use(cors());

process.env.SECRET_KEY = 'secret';

//REGISTER
players.post('/register', async (req, res) =>{
    const playerData = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        jerseyNumber: req.body.jerseyNumber
    };

   Player.findOne({
       where: {
           username: req.body.username
       }
   })
       .then(player => {
           if(!player) {
               playerData.password = bcrypt.hashSync(playerData.password, 10);
               Player.create(playerData)
                   .then(player => {
                       let token = jwt.sign(player.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
                       res.json({ token: token });
                   })
                   .catch(err => {
                       res.send("Error: " + err);
                   });
           } else {
               res.json({error: "Player already exists."});
           }
       })
       .catch(err => {
           res.send("Error: " + err);
       })
});

//LOGIN
players.post('/login', async (req, res) => {
    console.log(req.body);
   await Player.findOne({
       where: {
           username: req.body.username
       }
   })
       .then(player => {
           if(player && bcrypt.compareSync(req.body.password, player.password)) {
               let playertoken = jwt.sign(player.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
               res.json({ playertoken: playertoken });
           } else {
               res.status(401).send("Wrong user credentials.");
           }
       })
       .catch(err => {
           console.error(err);
           res.status(500).send("Something unexpected happened.");
       })
});

players.get('/profile', (req, res) => {
   var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY);

   Player.findOne({
       where: {
           id: decoded.id
       }
   })
       .then(player => {
           if(player) {
               res.json(player)
           } else {
               res.send('Player does not exist.');
           }
       })
       .catch(err => {
           res.send('Error: ' + err);
       });
});
module.exports = players;