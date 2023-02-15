

async function createCustomerDeposit (req, res) {
  const { description, amount } = req.body

  const { customer } = req

  const statementOperation = {
    type: 'credit',
    description,
    amount,
    created_at: new Date(),
  }

  customer.statement.push(statementOperation)

  return res
    .status(201)
    .send(statementOperation)
}


module.exports = {
  createCustomerDeposit
}
