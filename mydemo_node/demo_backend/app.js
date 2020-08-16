var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var bodyParser = require('body-parser')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose');
var passport = require('passport');
var configData = require('./config/config.js');

var app = express();
//var port = configData.config.runPort || 3100
var port = 3500




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
)

app.use('/', indexRouter);
app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// mongoose.connect(configData.db_configuration.dbHost, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (!err) {
//         //console.log('MongoDb Connected Successfully ...');
//     } else {
//         console.log('Error in connect Db:' + JSON.stringify(err, undefined, 2))
//     }
// })


mongoose.connect('mongodb://localhost:27017/budseekaer_db',(err)=>{
    if(!err){
        console.log('MongoDB Connection Succeeded...');
    }
    else{
        console.log('Error in DB Connection: ' +JSON.stringify(err, undefined, 2));
    }
});

const allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // intercept OPTIONS method
    if ("OPTIONS" == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
};
app.use(allowCrossDomain);

app.use(passport.initialize());
app.use(passport.session());


let server = app.listen(port, () => console.log(`Server listening to port ${port}`));

module.exports = app;