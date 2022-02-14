const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientPlaceType = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    place_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'typeOfPlaceSchema',
    },
});

const ClientPlaceType = mongoose.model("clientPlaceType", clientPlaceType);
module.exports = ClientPlaceType;