const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  // ids of the notes are stored within the user document as an array of Mongo ids.
  notes: [
    {
      // The type of the field is ObjectId that references note-style documents.
      // Mongo does not inherently know that this is a field that references notes,
      // the syntax is purely related to and defined by mongoose.
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
})

userSchema.set('toJSON', {
  transform: function (document, returnedObject) {
    returnedObject.id = returnedObject._id
    delete returnedObject.__v
    delete returnedObject._id

    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
