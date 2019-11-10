{/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json());

const players = [];

app.get('/players', (req, res) =>{
   res.json(players);
});

app.post('/players', async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(salt);
        console.log(hashedPassword);
        const player = {
            username: req.body.username,
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            jerseyNumber: req.body.jerseyNumber};
        players.push(player);
        res.status(201).send();

    }
    catch {
        res.status(500).send();
    }
});

app.post('/players/login', async (req, res) => {
    const player = players.find(player => player.username = req.body.username);

    if(player == null) {
        return res.status(400).send('Cannot find player');
    }
    try{
        if (await bcrypt.compare(req.body.password, player.password)) {
            res.send('Logged in');
        }else{
            res.send('Not allowed');
        }
    }
    catch {
        res.status(500).send();
    }


    app.listen(4000);
});*/}












const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require('bcrypt');


const app = express();

const SELECT_ALL_BPLAYERS_QUERY = 'SELECT * FROM players';

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'Jerico.aomine5',
    database: 'bulldogs'
};

const connection = mysql.createConnection(db_config);

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /players to see players')
});

app.get('/players/add',(req, res) =>{
   const { username, password, firstName, lastName, jerseyNumber, height, weight, isFormer, isAdmin } = req.query;
   const INSERT_PRODUCTS_QUERY =
       `INSERT INTO players(username, password, firstName, lastName, jerseyNumber)` +
       `VALUES('${username}', '${password}', '${firstName}', '${lastName}', '${jerseyNumber}')`;
   connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
       if(err) {
           return res.send(err);
       }
       else {
           return res.send('successfully added player')
       }
   });
});
//request n respond
app.get('/players', (req, res) => {
    connection.query(SELECT_ALL_BPLAYERS_QUERY, (err, results) => {
        if(err) {
            return res.send(err);
        }
        else {
            return res.json({
                data:results
            });
        }
    });
});

app.listen(4000, () => {
    console.log('Local Bulldogs server listening on port 4000')
});


connection.query(err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Connected to the MySQL server');
    }
});


