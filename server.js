const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, client) => {
  if (err) return console.error(err);
  const database = client.db('pages-api');
  require('./app/routes')(app, database);

  app.listen(port, () => {
    console.log({ "Live": port });
  });
});
