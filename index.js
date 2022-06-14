const { response, request } = require('express');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.static('build'));
app.use(cors());

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true
  }
];

app.get('/', (req, res) => {
  res.status(200).send('<h1>Hi there 👋, Welcome!</h1>');
});

app.get('/api/v1/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/api/v1/notes/:id', (req, res) => {
  const { id } = req.params;
  const singleNote = notes.find(notes => notes.id === Number(id));

  if (!singleNote) {
    return res.status(404).json({
      success: false,
      message: `Requested note with id ${id} not found`
    });
  }

  return res.json(singleNote);
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

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0;
  return maxId + 1;
};

app.post('/api/v1/notes', (req, res) => {
  const data = req.body;

  // Checking if the content property is valid or not
  if (!data.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  // Creating a new note object
  const note = {
    content: data.content,
    important: data.important || false,
    data: new Date(),
    id: generateId()
  };

  notes = notes.concat(data);
  res.json(data);
});

const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}...`);
});
