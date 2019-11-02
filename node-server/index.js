const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

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
