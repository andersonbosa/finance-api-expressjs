const routerController = require('express').Router()

const { verifyAccountExistance } = require('../middlewares/index')

const {
  getAllAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
  createAccount,
} = require('./account.js')

const {
  getStatement,
  getStatementByDate
} = require('./statement')

const { createCustomerDeposit } = require('./deposit')
const { withdrawCustomerAccount } = require('./withdraw')

routerController.get('/accounts', getAllAccounts)
routerController.get('/account', verifyAccountExistance, getAccount)
routerController.post('/account', createAccount)
routerController.put('/account', verifyAccountExistance, updateAccount)
routerController.delete('/account', verifyAccountExistance, deleteAccount)

routerController.get('/statement/', verifyAccountExistance, getStatement)
routerController.get('/statement/date', verifyAccountExistance, getStatementByDate)

routerController.post('/deposit/', verifyAccountExistance, createCustomerDeposit)
routerController.post('/withdraw', verifyAccountExistance, withdrawCustomerAccount)


routerController.get('/healthcheck', (_req, res) => {
  return res.json({
    status: 'live',
    when: new Date().toISOString(),
  })
})

module.exports = routerController
