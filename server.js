'use strict'

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const app = express();
const PORT = process.env.PORT || 3001;
const pg = require('pg');
const cors = require('cors');
const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => console.error(err));

app.use(cors());
app.get('/', newSearch);
app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.static('public'));
app.post('/searches', createSearch)
app.get('*', (req, res) => res.status(404).send('This route does not exist'));



function newSearch(req, res) {
  res.render('pages/index');
}

function createSearch(req, res) {
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  console.log(req.body);
  console.log(req.body.search);
  if (req.body.search[1] === 'title') {
    url += `+intitle:${req.body.search[0]}`;
  }
  if (req.body.search[1] === 'author') {
    url += `+inauthor:${req.body.search[0]}`;
  }
  superagent.get(url)
    .then(apiResponse => apiResponse.body.items.map(bookResult => new Book(bookResult.volumeInfo)))
    .then(results => res.render('pages/show', { searchResults: results }));
}

superagent.get(url)
  .then(agentResults => {
    let bookArray = agentResults.body.items;
    const betterBookArray = bookArray.map(book => new Book(book.volumeInfo))
    Response.send(betterBookArray);
  })

function Book(info) {
  const placeholderImage = 'https://i.imgur.com/J5LVHEL.jpg';
  this.title = info.title || 'No title avialable';
}
// function collectBookData (req, res){
//   console.log(req.body)
//   {search: ['harry potter', 'title']}
//   let searchWord = req.body.search[0];
//   let searchType = req.body.search[1];
//   let url = 'https://www.googleapis.com/books/v1/volumes?q=';
//   if( searchType === 'title'){
//     url +=
//   }
// }



app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
