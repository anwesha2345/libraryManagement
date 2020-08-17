const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

// Create Schema
const bookUserSchema = new mongoose.Schema({
  lu_id: {
    type: ObjectId,
    ref: "libraryusers",
    required: true
  },
  book_id: {
    type: ObjectId,
    ref: "book",
    required: true
  },
  dates:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
})

module.exports = bookUser = mongoose.model('bookUser', bookUserSchema)
