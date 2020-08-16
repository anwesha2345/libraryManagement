const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const BookSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = book = mongoose.model('book', BookSchema)
