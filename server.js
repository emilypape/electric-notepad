const express = require('express')
const fs = require('fs');
const path = require('path');
const notesArray = './db/notesArray.json';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    // reads db json file
    let notesData = fs.readFileSync(notesArray)
    let savedNotes = JSON.parse(notesData)
    // returns all the saved notes as json
    res.json(savedNotes)
});

app.post('/api/notes', (req, res) => {
    //receives a new note to save on the request body, 
    //add it to the db.json file
    // return the new note to the client.
    // give each note a unique id when saved
})

app.delete('/api/notes/:id', (req, res) => {
    // read all the notes from the db json file
    // select the note with the id to delete
    // rewrite notes to the db json file
})

// HTML ROUTES
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });