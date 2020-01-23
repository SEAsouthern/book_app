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
app.get('/books/:id', getOneBook);
app.get('/add', showForm);
app.post('/add', addBook)
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.post('/searches/new', createSearch)
app.get('*', (req, res) => res.status(404).send('This route does not exist'));
app.get('')
app.use(errorHandler);

function showForm(req, res) {
  res.render('pages/index');
}

function getBooks(req, res) {
  let SQL = 'SELECT * from saved_books;';

  return client.query(SQL)
    .then(results => res.render('index', {results: results.rows}))
    .catch(errorHandler);
}

function getOneBook(req, res) {
  getBooks()
    .then(shelves => {
      let SQL = 'SELECT * FROM saved_books WHERE id=$1;';
      let values = [req.params.id];
      return client.query(SQL, values)
        .then(res => {
          res.render('pages/books/show', { book: res.rows[0], bookshelves: shelves.rows });
        })
        .catch(err => errorHandler(err, res));
    })

}

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
    .then(results => res.render('searches/show', { searchResults: results
    }))
    .catch(() => {
      errorHandler('You done messed up A A Ron', req, res);
    })
}

// superagent.get(url)
//   .then(agentResults => {
//     let bookArray = agentResults.body.items;
//     const betterBookArray = bookArray.map(book => new Book(book.volumeInfo))
//     Response.send(betterBookArray);
//   })

function Book(info) {
  info.imageLinks !== undefined ? this.bookImage = info.imageLinks.thumbnail.replace('http:', 'https:'): this.bookImage = 'https://i.imgur.com/J5LVHEL.jpg';
  info.title !== undefined ? this.title = info.title : this.title = 'No title avialable';
  info.authors !== undefined ? this.authors = info.authors.join(', ') : this.authors = 'No authors available';
  info.description !== undefined ? this.description = info.description : this.description = 'No description available';
}

function addBook(req, res) {
  console.log(req.body)
  let { title, authors, description, imageURL } = req.body;

  let SQL = 'INSERT INTO saved_books(title, authors, description, imageURL) VALUES ($1, $2, $3, $4);';
  let values = [title, authors, description, imageURL];

  return client.query(SQL, values)
    .then(res.redirect('/'))
    .catch(err => errorHandler(err, res));
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

// function notFoundHandler(req, res) {
//   res.status(404).send('clever girl');
// }

function errorHandler(error, req, res) {
  console.log('no soup for you', error);
  res.status(500).send(error);
}

client.connect()
  .then(() => {
    app.listen(PORT, () => console.log(`Your server is listening on ${PORT}`));
  });
