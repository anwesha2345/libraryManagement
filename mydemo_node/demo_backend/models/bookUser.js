const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const bookUserSchema = new Schema({
  lu_id: {
    type: String
  },
  book_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = bookUser = mongoose.model('bookUser', bookUserSchema)
