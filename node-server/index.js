var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({extended: false})
);

const Players = require('./routes/Players');

app.use("/players", Players);

app.listen(port, function () {
   console.log("Server is running on port: " + port);
});
