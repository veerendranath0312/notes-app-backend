const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://veerendranath0312:${password}@notesapp.dvi8lis.mongodb.net/noteApp?retryWrites=true&w=majority&appName=notesapp`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//   content: 'GET and POST are the most important methods of HTTP protocol',
//   important: true,
// })

// note.save().then((result) => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

Note.find({ important: true }).then((notes) => {
  notes.forEach((note) => console.log(note))
  mongoose.connection.close()
})
