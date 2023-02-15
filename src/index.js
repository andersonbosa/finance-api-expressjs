const express = require('express')
const routerController = require('./routes/index')

const api = express()

api.use(express.json())
api.use(express.urlencoded({ extended: true }))

api.use(routerController)

api.listen(8888)
console.log('Server started at: http://localhost:8888')
