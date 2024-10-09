const express = require('express')
const { getAllUsers, createUser } = require('../controllers/userController.js')

const userRouter = express.Router()

userRouter.route('/').get(getAllUsers).post(createUser)

module.exports = userRouter
