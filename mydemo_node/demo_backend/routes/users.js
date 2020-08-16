const express = require('express')
const router = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const User = require('../models/users');
var authModel = require('../models/users');
const { Users } = require('../models/users');
var authController = require('../controllers/authentication');
var authLogin = require('../controllers/authenticate');
var passport = require('passport');
router.use(cors())

const bcrypt = require('bcrypt');
process.env.SECRET_KEY = 'secret'
var secret = 'budseeker_db6987' 

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/customerFiles');
    },
    filename: function (req, file, cb) {
        fileExt = file.originalname.split('.').pop();
        fileName = Date.now() + '.' + fileExt;
        cb(null, fileName);
    }
});
var uploadCustomerImage = multer({
    storage: storage
});

router.post("/signIn", authLogin.authLocal, authLogin.LoginUser);

router.get("/jwt-Login-api-authentication-check", authLogin.authJwt, async(req,res)=>{
    var user = req.user
    res.json({
        success:true,
        code:200,
        user
    })
})

router.post("/create-book",authController.createBookDetails);
router.post("/create-book-user",authController.createBookUserDetails);
router.get("/get-all-books",authController.findAllBooks);
router.get("/get-all-users",authController.findAllBookUser);

router.post("/sign-up",authController.signUp);


























// Customer Add
router.post("/add-customer-details", uploadCustomerImage.single('customer_file_name'), async(req,res)=>{
    const today = new Date();
    var customerDetails = await  User.create({
        first_name: req.body.first_name,
        last_name : req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        ageCheck: req.body.ageCheck,
        gender: req.body.gender,
        role_id:2,
        user_type:'C',
        original_name:req.file === undefined ? null :  req.file.originalname,
        path:req.file === undefined ? null :  req.file.path,
        file_name:req.file === undefined ? null : req.file.filename,
        date: today
    })

    if(customerDetails){
        res.json({
            success: true,
            code:200,
            data: customerDetails,
            message:'Customer Details Inserted Successfully'
        })
    }
    else{
        res.json({
            success: false,
            code:500,
            message:'Customer Details Inserted Successfully'
        })  
    }

})


router.get("/get-all-customer-details", async(req,res)=>{
        
    var customerDetails = await User.find({user_type: 'C'})
    

    res.json({
        success: true,
        code:200,
        customerDetails
    })
})


router.post("/get-individual-customer-details", async(req,res)=>{
    var id = req.body.id;
    var details = await User.findOne({
        _id:id
    })
    res.json({
        success: true,
        code:200,
        details
    })
})




router.post("/update-customer-details", uploadCustomerImage.single('customer_file_name'), async(req,res)=>{
    var id = req.body.id
    const today = new Date();
    var customer = {
        first_name:req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        mobile: req.body.mobile,
        ageCheck: req.body.ageCheck,
        gender: req.body.gender,
        role_id:2,
        user_type:'C',
        original_name: req.file === undefined ? null : req.file.originalname,
        path:req.file === undefined ? null : req.file.path,
        file_name:req.file === undefined ? null :req.file.filename,
        date: today
        
    }

    await User.findByIdAndUpdate(id, {$set: customer}, {new: true}, (err,doc) =>{
        if(!err){
            res.json({
                success: true,
                code:200
            })
        }
    });

})




router.post("/customer-delete", async(req,res)=>{
    var id = req.body.id;
    await User.findByIdAndRemove(id, (err, doc)=>{
        if(!err){
            res.json({
                success: true,
                code:200
            })
        }
        else{
            res.json({
                success: false,
                code:500
            })  
        }
    })
})



module.exports = router;