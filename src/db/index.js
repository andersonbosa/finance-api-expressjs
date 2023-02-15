const customers = require('./data/customers.json')

class DBInterface {

  constructor() {
    this.customers = customers
  }

}


module.exports = {
  DBController: new DBInterface()
}
