require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note.js');

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hi there 👋, Welcome!</h1>');
});

// Get all notes
app.get('/api/v1/notes', (req, res) => {
  Note.find({}).then(notes => {
    res.json(notes);
  });
});

// Create a note
app.post('/api/v1/notes', (req, res) => {
  const data = req.body;

  // Checking if the content property is valid or not
  if (!data.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  // Creating a new note object
  const note = new Note({
    content: data.content,
    important: data.important || false,
    date: new Date()
  });

  // Saving note to DB
  note.save().then(savedNote => {
    res.json(savedNote);
  });
});

// Get note by ID
app.get('/api/v1/notes/:id', (req, res) => {
  const { id } = req.params;
  Note.findById(id).then(note => res.json(note));
});

app.delete('/api/v1/notes/:id', (req, res) => {
  const { id } = req.params;
  const singleNote = notes.find(notes => notes.id === Number(id));

  if (!singleNote) {
    return res.status(404).json({
      success: false,
      message: `Requested note with id ${id} not found`
    });
  }

  notes = notes.filter(note => note.id !== Number(id));

  return res.status(204).end();
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});
