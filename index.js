const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyparser = require('body-parser');

const app = express();

const SELECT_ALL_BPLAYERS_QUERY = 'SELECT * FROM player';

const db_config = {
    host: 'localhost',
    user: 'root',
    password: 'Jerico.aomine5',
    database: 'bulldogs'
};

const connection = mysql.createConnection(db_config);

connection.query(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /player to see players')
});

app.get('/player/add',(req, res) =>{
   const { username, password, firstName, lastName, jerseyNumber, height, weight, isFormer, isAdmin } = req.query;
   const INSERT_PRODUCTS_QUERY =
       `INSERT INTO player(username, password, firstName, lastName, jerseyNumber)` +
       `VALUES('${username}', '${password}', '${firstName}', '${lastName}', '${jerseyNumber}')`;
   connection.query(INSERT_PRODUCTS_QUERY, (err, results) => {
       if(err) {
           return res.send(err);
       }
       else {
           return res.send('successfully added product')
       }
   });
});
//request n respond
app.get('/player', (req, res) => {
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
