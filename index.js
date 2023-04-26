const express = require("express");

const app = express();
const PORT = 3001;

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.status(200).send("<h2>Welcome to Notes API</h2>");
});

app.get("/api/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find((note) => note.id === Number(id));

  if (!note) {
    return res
      .status(400)
      .json({ msg: "Data not found or provide a valid number" });
  }

  res.status(200).json({ data: note });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
