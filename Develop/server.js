const express = require('express');
const fs = require('fs');
const termData = require('./db/db.json')

const app = express();

const notesRouter = require('./routes/notes')

PORT = 3001;

app.use(express.static('public'));

app.use('/notes', notesRouter);

app.get('/', (req, res) => {res.send('')});

app.get('/api/', (req, res) => {res.json(termData)});

//Get
app.get
//Post

//Delete


// const getNotes = () =>
//   fetch('/api/notes', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

// const saveNote = (note) =>
//   fetch('/api/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(note),
//   });

// const deleteNote = (id) =>
//   fetch(`/api/notes/${id}`, {
//     method: 'DELETE',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });



app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});