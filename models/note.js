const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    required: true,
  },
  important: Boolean,
  // references the user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// Format the objects returned by Mongoose using 'toJSON' method of the schema,
// which is used on all instances of the models produced with that schema
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = mongoose.model('Note', noteSchema)

module.exports = Note
