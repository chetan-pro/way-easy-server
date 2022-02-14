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

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}, (error) => {
    console.log("Database not connected" + error);
});

// 
// auth.authenticateToken.unless = unless;

// app.use(
//     auth.authenticateToken.unless({
//         path: [
//             { url: "/users/login", methods: ['POST'] },
//             { url: "/users/save-and-edit-profile", methods: ['POST'] },
//             { url: "/users/generate-otp", methods: ['POST'] },
//             { url: "/users/verify-OTP", methods: ['POST'] },
//             { url: "/clients/register-client", methods: ['POST'] },
//             { url: "/clients/add-place-address", methods: ['POST'] },
//             { url: "/static/add-type-of-place", methods: ['POST'] },
//             { url: "/static/get-type-of-place", methods: ['GET'] },
//             { url: "/static/add-type-of-parties", methods: ['POST'] },
//             { url: "/static/get-type-of-parties", methods: ['GET'] },
//             { url: "/static/add-other-services", methods: ['POST'] },
//             { url: "/static/get-other-services", methods: ['GET'] },
//             { url: "/static/add-days", methods: ['POST'] },
//             { url: "/static/get-days", methods: ['GET'] },
//             { url: "/static/get-food-type", methods: ['GET'] },
//             { url: "/static/add-food-type", methods: ['POST'] },
//             { url: "/static/get-type-of-spaces", methods: ['GET'] },
//             { url: "/static/add-type-of-spaces", methods: ['POST'] },
//             { url: "/static/add-privacy-type", methods: ['POST'] },
//             { url: "/static/get-privacy-type", methods: ['GET'] },
//         ]
//     }));

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