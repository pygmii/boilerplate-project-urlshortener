require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Developed function
app.post('/api/shorturl', function(req, res) {
  // Read or create db.json
  console.log(req.body);

  let connection = mysql.createConnection({
    host: '119.59.102.102',
    user: 'urlshortener',
    password: 'c1Yes4',
    database: 'urlshortener'
  });

  connection.query(
    'INSERT INTO `urlshortener`(`originalurl` `shorturl`) VALUES ("google.com", "1",)',
    //[req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
    function(err, results) {
      res.json(results);
    }
  );
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
