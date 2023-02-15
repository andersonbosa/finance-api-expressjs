
const { v4: uuidv4 } = require('uuid')

const { DBController } = require('../db/index.js')
const { parseCpfFromString } = require('../utils.js')

async function getAllAccounts (req, res) {
  const customers = DBController.customers || []

  return res.json(customers)
}


async function getAccount (req, res) {
  const { customer } = req

  return res.json(customer)
}

async function updateAccount (req, res) {
  const { customer } = req

  const { name } = req.body
  if (!name) {
    return res
      .status(404)
      .json({ error: 'Invalid name' })
  }

  customer.name = name

  return res
    .status(201)
    .json(customer)
}

async function deleteAccount (req, res) {
  const { customer } = req

  DBController.customers.splice(customer, 1)

  return res
    .status(200)
    .json({
      deleted: true,
      customer: customer
    })
}

async function createAccount (req, res) {
  const { cpf, name } = req.body

  const formatedCpf = parseCpfFromString(cpf)
  const cpfIsInvalid = !formatedCpf || formatedCpf.length !== /* REQUIRED CPF DIGITS */ 11
  if (cpfIsInvalid) {
    return res
      .status(400)
      .json({ error: "CPF is invalid", })
  }

  const customerAlreadyExists = DBController.customers.some(
    customer => customer.cpf === cpf
  )
  if (customerAlreadyExists) {
    return res
      .status(400)
      .json({ error: "Customer already exists" })
  }

  const newCustomer = {
    id: uuidv4(),
    name,
    cpf,
    statement: [],
  }

  DBController.customers.push(newCustomer)

  return res
    .status(201)
    .send(newCustomer)
}


module.exports = {
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  createAccount
}