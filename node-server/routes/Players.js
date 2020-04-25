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
        jerseyNumber: req.body.jerseyNumber,
        height: req.body.height,
        weight: req.body.weight,
        isFormer: req.body.isFormer,
        isAdmin: req.body.isAdmin
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
                       console.log(req.body.isFormer + " . " + req.body.isAdmin);
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
    console.log("req body   " + req.body);
    await Player.findOne({
       where: {
           username: req.body.username
       }
   })
       .then(player => {
           if(player && bcrypt.compareSync(req.body.password, player.password)) {
               let playertoken = jwt.sign(player.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
               res.json({ playertoken: playertoken,
                            username: player.dataValues.username,
                            id: player.dataValues.p_id,
                            isAdmin: player.dataValues.isAdmin});
           } else {
               res.status(401).send("Wrong user credentials.");
           }
       })
       .catch(err => {
           err.status(401).send("hello");
       });
});

//PROFILE
players.get('/:p_id', async (req, res) => {
    await Player.findOne({
        where: {
            p_id: req.params.p_id
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
            console.error(err);
            res.status(500).send("Something unexpected happened.");
        });
});

players.put('/update/', async (req, res) => {
   const playerData = {
       firstName: req.body.firstName,
       password: req.body.newPassword,
       lastName: req.body.lastName,
       jerseyNumber: req.body.jerseyNumber,
       height: req.body.height,
       weight: req.body.weight,
       isFormer: req.body.isFormer,
       isAdmin: req.body.isAdmin
   };

   await Player.update(
       playerData,
       {
           where: { jerseyNumber: req.body.jerseyNumber }
       }
   )
       .then(player => {
           res.json(player)
       })
       .catch(err => {
           res.status(500).send(err.message);
       })
});

players.delete('/delete/:username', async (req, res) => {

    await Player.destroy({
        where:{
            username: req.params.username
        }
    },{truncate: true})
        .then(() => {
            res.json({status: 'Player ' + req.params.username + ' removed.' })
        })
        .catch(err => {
            res.json("Something unexpected happened.");

        })
});

module.exports = players;