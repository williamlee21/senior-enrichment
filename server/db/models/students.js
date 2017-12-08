const Sequelize = require('sequelize')
const db = require('../index')

const Students = db.define('students', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  gpa: {
    type: Sequelize.FLOAT,
    validate  : {
      isFloat: true,
      min: 0.0,
      max: 4.0
    }
  },
  fullName: {
      type: Sequelize.VIRTUAL,
      get(){
        return (`${this.firstName} ${this.lastName}`)
      }
  }
})

module.exports = Students
