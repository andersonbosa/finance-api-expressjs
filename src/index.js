const express = require('express')
const { request, response } = require('express')
const uuid = require('uuid')

const app = express()

app.use(express.json())

app.get('/', (_req, res) => {
  return res.json({
    hello: 'world'
  })
})

app.listen(8888, () => {
  console.log('Server started at: http://localhost:8888')
})