const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_BPLAYERS_QUERY = 'SELECT * FROM player';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jerico.aomine5',
    database: 'bulldogs'
});

connection.connect(err => {
    if(err) {
        return err;
    }
});

app.use(cors());

app.get('/', (req, res) => {
    res.send('go to /player to see players')
});
//request n respond
app.get('/player', (req, res) => {
    connection.query(SELECT_ALL_BPLAYERS_QUERY, (err, results) => {
        if(err) {
            return res.send(err)
        }
        else {
            return res.json({
                data: results
            })
        }
    });
});

app.listen(4000, () => {
    console.log('Local Bulldogs server listening on port 4000')
});