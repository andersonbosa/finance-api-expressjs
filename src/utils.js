
function getBalance (statement) {
  const handleOperation = (account, operation) => {
    if (operation.type === 'credit') {
      return account + operation.amount
    } else {
      return account - operation.amount
    }
  }

  const balance = statement.reduce(handleOperation, 0)

  return balance
}

function parseCpfFromString (rawCpf = '') {
  try {
    const regex = /\d+/g
    const matches = rawCpf.match(regex)
    if (!matches) {
      return undefined
    }

    const mapped = matches.map(match => parseInt(match, 10))
    const formatedCpf = mapped.join('')

    return formatedCpf

  } catch (error) {
    console.error(error)
    return ''
  }
}

module.exports = {
  parseCpfFromString,
  getBalance
}
