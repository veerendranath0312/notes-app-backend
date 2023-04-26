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
  res.status(200).send("<h2>Hello from server</h2>");
});

app.get("/api/notes", (req, res) => {
  res.status(200).json({ data: notes });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
