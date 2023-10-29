require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { LowSync } = require('lowdb/lib');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// Developed function
app.get('/api/test', function(req, res) {
  const title = "This is a test";
  const adapter = new JSONFileSync('file.json');
  //const db = new LowSync(adapter)
  const db = new LowSync(adapter);

  db.read();  //Load the content of the file into memory
  db.data ||= { posts: [] }; //default value

  db.data.posts.push({ title }); //add data into the "collection"

  db.write() //persist the data by saving it to the JSON file

  //any Find-like operation is left to the skill of the user

  let record = db.data.posts.find( p => p.title == "Hello world");
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
