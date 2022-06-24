const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://cluster0:${password}@cluster0.zfgtwms.mongodb.net/noteApp?retryWrites=true&w=majority`

// Created a Schema
const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
})

// Created a Note model
const Note = mongoose.model('Note', noteSchema)

// mongoose
//   .connect(url)
//   .then(result => {
//     console.log('connected');

//     const note = new Note({
//       content: 'HTML is easy',
//       date: new Date(),
//       important: true
//     });

//     return note.save();
//   })
//   .then(() => {
//     console.log('note saved!');
//     return mongoose.connection.close();
//   })
//   .catch(err => console.log(err));

mongoose
  .connect(url)
  .then(() => {
    console.log('connected')

    return Note.find({})
  })
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })

    mongoose.connection.close()
  })
