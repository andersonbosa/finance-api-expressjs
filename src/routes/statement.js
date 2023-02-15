

async function getStatement (req, res) {
  const { customer } = req

  return res.json(customer.statement)
}

async function getStatementByDate (req, res) {
  const { customer } = req
  const date = req.body.date || req.query.date

  /* TODO: parse and valid date format: yyyy/mm/dd */
  const dateFormat = new Date(date + ' 00:00')

  const filtredStatements = customer.statement.filter(
    (statement) => {
      const statementDate = new Date(statement.created_at).toDateString()
      const searchedDate = new Date(dateFormat).toDateString()
      return statementDate === searchedDate
    }
  )

  return res.json(filtredStatements)
}

module.exports = {
  getStatement,
  getStatementByDate
}