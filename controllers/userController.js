const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  })
  res.status(200).json({ status: 'success', data: { users } })
}

const createUser = async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const createdUser = await User.create({
    username,
    name,
    passwordHash,
  })

  res.status(201).json({ status: 'success', data: { user: createdUser } })
}

module.exports = { getAllUsers, createUser }
