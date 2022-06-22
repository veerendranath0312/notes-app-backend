require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Note = require('./models/note.js');

const app = express();
app.use(express.json()); // This has to be very first middleware loaded
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
app.get('/api/v1/notes/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then(note => {
      if (note) {
        res.json(note);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

app.delete('/api/v1/notes/:id', (req, res, next) => {
  const { id } = req.params;
  Note.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(err => next(err));
});

app.put('/api/v1/notes/:id', (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  const note = {
    content: data.content,
    important: data.important
  };

  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err));
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

const errorHandler = (error, req, res, next) => {
  console.log(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});
