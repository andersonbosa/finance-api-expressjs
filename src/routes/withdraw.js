const { getBalance } = require('../utils')

async function withdrawCustomerAccount (req, res) {
  const { amount } = req.body
  const { customer } = req

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return res
      .status(400)
      .json({ error: 'Insufficient funds!' })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  }

  customer.statement.push(statementOperation)

  return res
    .status(201)
    .send(statementOperation)
}

module.exports = {
  withdrawCustomerAccount
}
