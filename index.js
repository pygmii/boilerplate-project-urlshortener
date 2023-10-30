require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const validator = require('validator');
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

  if(!validator.isURL(req.body.url)) {
    res.json({ error: 'invalid url' });
    return;
  }

  let connection = mysql.createConnection({
    host: '119.59.102.102',
    user: 'urlshortener',
    password: 'c1Yes4',
    database: 'urlshortener'
  });

  connection.query(
    'INSERT INTO urlshortener(originalurl) VALUES (?)',
    [req.body.url],
    function(err, results) {
      if(err)
      {
        console.error(err.message);
        throw err;
      }

      
      let shortUrl = results.insertId;
      console.log("1 record inserted, ID: " + shortUrl);
      
      res.json({original_url: req.body.url, short_url: results.insertId});
    }
  );
});

// Developed function
app.get('/api/shorturl/:id', function(req, res) {
  let shortenUrl = req.params.id;

  console.log(shortenUrl);

  let connection = mysql.createConnection({
    host: '119.59.102.102',
    user: 'urlshortener',
    password: 'c1Yes4',
    database: 'urlshortener'
  });

  let url = "";

  connection.query(
    'SELECT originalurl FROM urlshortener WHERE id=?',
    [shortenUrl],
    function(err, results) {
      if(err)
      {
        console.error(err.message);
        throw err;
      }

      url = results[0].originalurl;
      console.log("selected record: " + url);
      
      res.redirect(301,url);
    }
  );
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
