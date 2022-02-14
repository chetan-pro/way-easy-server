const jwt = require('jsonwebtoken');
const Client = require('../models/client.model');

async function authenticateToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) return res.send(401);


    const data = jwt.verify(token, "WAY_EASY_SECRET_KEY");
    await Client
        .findOne({ owner_phonenumber: data.data })
        .then((data) => {
            req.authId = data.id;
            next();
        }).
    catch((error) => res.send(401))
}

function generateAccessToken(ownerPhonenumber) {
    return jwt.sign({ data: ownerPhonenumber }, "WAY_EASY_SECRET_KEY", );
}

module.exports = {
    authenticateToken,
    generateAccessToken,
}