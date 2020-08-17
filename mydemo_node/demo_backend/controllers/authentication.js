var express = require('express');
var router = express.Router();
var passport = require('passport');
const User = require('../models/users');
const Book = require('../models/book');
const LiUser = require('../models/libraryusers');
var randomstring  = require('randomstring');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');


var signUp = function(req, res, error){
	var email = req.body.email;
	//var password = req.body.password;
	var mobile = req.body.mobile;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	const saltRounds = 10;

	bcrypt.hash(req.body.password, saltRounds, async(err,hash)=>{
		req.body.password = hash
		var user = await User.create({
			email:email,
			password:hash,
			first_name:first_name,
			last_name:last_name,
			mobile:mobile,
			type:'admin',
			role_id:1
		});

		res.status(200).json({"data":user})
	})
}


var createBookDetails = async function(req,res,error){
	var name = req.body.name;
	var description = req.body.description;
	var author = req.body.author;

	var books = await Book.create({
		name:name,
		description:description,
		author:author
	})

	if(books){
		res.status(200).json({"data":books})
	}
	else{
		res.status(500).json({"message":"Unsuccessfull Registration"})
	}

}

var createBookUserDetails = async function(req,res,error){
	var email = req.body.email;
	var mobile = req.body.mobile;
	var first_name = req.body.first_name;
	var last_name = req.body.last_name;
	const saltRounds = 10;

	bcrypt.hash(req.body.password, saltRounds, async(err,hash)=>{
		req.body.password = hash
		var user = await LiUser.create({
			email:email,
			password:hash,
			first_name:first_name,
			last_name:last_name,
			mobile:mobile,
			type:'user',
			role_id:2
		});

		res.status(200).json({"data":user})
	}) 
}

var findAllBooks = async function(req,res,error){
	var bookDetails = await Book.find({});
	var books = [];
	for(let i=0; i<bookDetails.length; i++){
		books.push({
			"id":bookDetails[i]._id,
			"name":bookDetails[i].name
		})
	}
	res.status(200).json({books})
}

var findAllBooksValue = async function(req,res,error){
	var bookDetails = await Book.find({});
	res.status(200).json({bookDetails})
}

var findAllBookUser = async function(req,res,error){
	var bookuserDetails = await LiUser.find({});
	res.status(200).json({"data":bookuserDetails})
}

module.exports = {signUp:signUp , createBookDetails:createBookDetails,
 findAllBooks:findAllBooks, createBookUserDetails:createBookUserDetails, 
 findAllBookUser:findAllBookUser, findAllBooksValue:findAllBooksValue};

