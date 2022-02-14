const Place = require('../models/place.model');
require("dotenv").config();

async function createPlace(params, callback) {
    console.log("params");
    console.log(params);
    if (params.name === undefined) {
        return callback({ message: "Place name is required" });
    }
    const place = new Place(params);
    place
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

module.exports = {
    createPlace
}