const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const libraryUserSchema = new Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  mobile: {
    type: String    
  },
  original_name:{
    type: String
  },
  file_name:{
    type: String
  },
  path:{
    type: String
  },
  gender:{
    type:Number
  },
  ageCheck:{
    type:Number
  },
  role_id:{
    type:Number
  },
  type:{
    type:String
  },
  address:{
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = libraryUser = mongoose.model('libraryUser', libraryUserSchema)
