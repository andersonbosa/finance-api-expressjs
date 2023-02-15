const { DBController } = require('../db/index.js')

function verifyAccountExistance (req, res, next) {
  const { cpf } = req.body

  const customer = DBController.customers.find(
    customer => customer.cpf === cpf
  )

  if (!customer) {
    return res
      .status(404)
      .json({ error: 'Customer invalid or not found' })
  }

  req.customer = customer

  return next()
}


module.exports = {
  verifyAccountExistance
}
