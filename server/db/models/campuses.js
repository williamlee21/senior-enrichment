const Sequelize = require('sequelize')
const db = require('../index')

const Campuses = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Campuses
