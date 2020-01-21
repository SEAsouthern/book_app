'use strict'

require('dotenv').config();

const express = require('express');
const pg = require('pg');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const app = express();
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));
// const superagent = require('superagent');

app.use(cors());
app.get('/', newSearch);
app.set('view engine', 'ejs');
// app.use(express.urlencoded());
app.use(express.static('public'));
// app.post('/searches', createSearch)




function newSearch(req, res){
  res.render('index');
}





app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
