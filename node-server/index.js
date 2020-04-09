const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 4000;


const mysql = require('mysql');
const db_config = {
   host: 'localhost',
   user: 'root',
   password: 'Jerico.aomine5',
   database: 'bulldogs'
};

const SELECT_ALL_BPLAYERS_QUERY = 'SELECT * FROM players';


app.use(cors());
app.use(
    bodyParser.urlencoded({extended: false})
);
app.use(bodyParser.json());

const Players = require('./routes/Players');

app.use("/players", Players);



app.get('/', (req, res) => {
   res.send('go to /players to see players')
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

//: gives you certain database params
/*app.get('/player/:p_id', (req, res) => {
   connection.query(`SELECT * FROM players WHERE p_id=${req.params.p_id}`, (err, result) =>{
      if(err) {
         return res.send(err);
      }
      else {
         return res.json({
            data:result

         });

      }

   });
});*/
const connection = mysql.createConnection(db_config);

connection.connect(err => {
   if(err) {
      return err;
   }
});



app.listen(port, function () {
   console.log("Server is running on port: " + port);
});