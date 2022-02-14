const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientDJ = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    dj_name: {
        type: String,
    },
    dj_description: {
        type: String,
    },
    type_of_dj: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "privacyType"
    },
    cost_per_hour: {
        type: Number,
    },
});

const ClientDJ = mongoose.model("clientDJ", clientDJ);
module.exports = ClientDJ;