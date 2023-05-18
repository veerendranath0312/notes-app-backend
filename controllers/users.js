const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const usersRouter = express.Router()

usersRouter.get('/', async (req, res) => {
  const users = await User.find({})
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({ username, name, passwordHash })

  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter
