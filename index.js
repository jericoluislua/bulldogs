const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const SELECT_ALL_BPLAYERS_QUERY = 'SELECT * FROM players';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jerico2705',
    database:
})

app.use(cors());
//request n respond
app.get('/', (req, res) => {
    res.send('Go to /')
});

app.listen(4000, () => {
    console.log('Local Bulldogs server listening on port 4000')
});