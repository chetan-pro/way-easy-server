const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientPartyType = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    party_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'typeOfPartiesSchema',
    },
});

const ClientPartyType = mongoose.model("clientPartyType", clientPartyType);
module.exports = ClientPartyType;