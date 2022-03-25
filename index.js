const express = require('express')
const morgan = require('morgan')
const path = require('path')
const requestIp = require('request-ip')
const cors = require('cors');

const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
var bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/error');
const formidableMiddleware = require('express-formidable');
const unless = require('express-unless');
const db = require("./models");

const app = express();

// import i18n

global.__basedir = `${__dirname}/`

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'pug')
    //app.set('views', path.join(`${__dirname}/src`, 'public'))
app.use(express.static(path.join(`${__dirname}/src`, 'public')));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
app.use(requestIp.mw())
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    next()
})




//form-urlencoded
app.use('/users', require("./routes/users.routes"));
app.use('/places', require("./routes/places.routes"));
app.use('/clients', require("./routes/client.routes"));
app.use('/static', require("./routes/static.data.routes"));

app.use(errors.errorHandler);



app.listen(process.env.port || 4000, function() {
    console.log("ready to go");
    console.log("ready to go");
})