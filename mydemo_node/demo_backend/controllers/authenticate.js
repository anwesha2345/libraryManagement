var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/users');
var randomstring  = require('randomstring');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
var LocalStrategy = require('passport-local');
var bcrypt = require('bcrypt');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
const passportJWT  = require('passport-jwt');
var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = 'secret123'; 
 

    var localOpts = {
         usernameField: 'email',
     };

    var localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
                var user = await User.findOne({
                     email
                });
                if (!user) {
                    return done(null,err)
                } 
                    return done(null,user)
     });
    passport.use(localStrategy);
    

    var authLocal = passport.authenticate('local', {
         session: false
     });


        var LoginUser = function login(req,res,next){
            var userId = req.user._id
            const payload = {
                _id: req.user._id,
            }
            const options = {
                subject: `${userId}`,
                expiresIn: 3600
            }
            const token = jwt.sign(payload, 'secret123', options);
        
            return res.status(200).json({"data":req.user,"token":token})
        }

        var jwtStrategy  = new JwtStrategy(options, async function(jwtPayload, done) {   
            var user = await User.findById(jwtPayload.sub);

             if (!user) {
               return done(null, false);
             }
             else{
                return done(null, user);
             }
                         
        })
        passport.use(jwtStrategy);

        var authJwt = passport.authenticate('jwt', { session: false });



    module.exports = {authLocal:authLocal, LoginUser:LoginUser, authJwt:authJwt};

