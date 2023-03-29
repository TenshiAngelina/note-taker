const express = require('express');
const fs = require('fs');
const termData = require('./db/db.json');
const path = require("path");
const uuid = require("./helpers/uuid.js");

const app = express();

const notesRouter = require('./routes/notes');

PORT = 3001;

app.use(express.static('docs'));
app.use(express.json());
app.use('/notes', notesRouter);

// CHECK
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/docs/index.html'))
);

//Get
app.get('/api/notes', (req, res) => {
  console.info(req.rawHeaders);
  console.info(`${req.method} request received`);

  fs.readFile('./db/db.json','utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    console.log(parsedData);
    res.json(parsedData);
    });
});

//Post
app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);

  console.log(req.body);
  
  fs.readFile('./db/db.json','utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const noteID = {
      ...req.body,
      id: uuid(),
    }
    parsedData.push(noteID);
    fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });

});

//Delete
app.delete("/api/notes/:id", (req, res) => {
  let newDatabase = [];
  for (var i = 0; i < termData.length; i++) {
    if (termData[i].id != req.params.id) {
      newDatabase.push(termData[i]);
    }
  }

  fs.writeFile("./db/db.json", JSON.stringify(newDatabase), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.json(newDatabase);
  });
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});