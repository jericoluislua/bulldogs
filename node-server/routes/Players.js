const express = require('express');
const players = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Player = require("../models/Player");
players.use(cors());

process.env.SECRET_KEY = 'secret';

const mysql = require('mysql');
const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'Jerico.aomine5',
    database: 'bulldogs'
};




//REGISTER
// !!! this kind of register works but its a get response and isnt in routes/Players!!!
players.post('/register', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const { username, password, firstName, lastName, jerseyNumber, height, weight, isFormer, isAdmin } = req.query;
        console.log(password);
        const hashedPassword = await bcrypt.hash(password, salt);
        const INSERT_PRODUCTS_QUERY =
            `INSERT INTO players(username, password, firstName, lastName, jerseyNumber)` +
            `VALUES('${username}', '${hashedPassword}', '${firstName}', '${lastName}', '${jerseyNumber}')`;
        connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
            if(err) {
                return res.send(err);
            }
            else {
                return res.send('successfully added player')
            }
        });
    }catch (e) {
        console.log(e);
    }

});

const connection = mysql.createConnection(db_config);

connection.connect(err => {
    if(err) {
        return err;
    }
});



// !!! This register doesnt work !!!
/*players.post('/register', async (req, res) =>{
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
});*/

//LOGIN
players.post('/login', async (req, res) => {
    console.log(req.body);
   await Player.findOne({
       where: {
           username: req.body.username
       }
   })
       .then(player => {
           if(bcrypt.compareSync(req.body.password, player.password)) {
               let playertoken = jwt.sign(player.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
               res.json({ playertoken: playertoken });
           } else {
               res.send("Player does not exist.");
           }
       })
       .catch(err => {
           res.send("Error: " + err);
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