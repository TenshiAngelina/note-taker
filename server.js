const express = require('express');
const fs = require('fs');
const termData = require('./db/db.json')

const app = express();

const notesRouter = require('./routes/notes')

PORT = 3001;

app.use(express.static('public'));
app.use(express.json());
app.use('/notes', notesRouter);

app.get('/', (req, res) => {res.send('')});

app.get('/api/notes', (req, res) => {res.json(termData)});

//Get
app.get('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
});
//Post
app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);
});
//Delete

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});