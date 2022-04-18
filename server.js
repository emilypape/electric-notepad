const express = require('express')
const fs = require('fs');
const path = require('path');
const notesArray = './db/notesArray.json';

const PORT = process.env.PORT || 3005;
const app = express();

app.use(express.static('public')); //Serve up files in public directory
app.use(express.json()); //Used to parse JSON bodies

app.get('/api/notes', (req, res) => {
    // reads db json file
    let notesData = fs.readFileSync(notesArray)
    let savedNotes = JSON.parse(notesData)
    // returns all the saved notes as json
    res.json(savedNotes)
});

app.post('/api/notes', (req, res) => {
    //receives a new note to save on the request body, 
    const newNoteData = req.body;
    //add it to the db.json file
    const savedNotes = JSON.parse(fs.readFileSync(notesArray))
    savedNotes.push(newNoteData)
    savedNotes.forEach((note, index) => {
        note.id = index + 1;
    })
    let noteString = JSON.stringify(savedNotes);
    fs.writeFileSync(notesArray, noteString)
    // return the new note to the client.
    res.json(newNoteData);
    // give each note a unique id when saved
});

app.delete('/api/notes/:id', (req, res) => {
    // read all the notes from the db json file
    const notesData = fs.readFileSync(notesArray);
    let savedNotes = JSON.parse(notesData);
    // select the note with the id to delete
    let id = parseInt(req.params.id);
    savedNotes = savedNotes.filter((note) => {
        if(note.id === id) {
            return false
        }
        return true;
    })
    // rewrite notes to the db json file
    let noteString = JSON.stringify(savedNotes)
    fs.writeFileSync(notesArray, noteString)

    res.json(`Note ${id} Deleted!`)
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