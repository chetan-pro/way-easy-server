const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientOtherServicesType = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    service_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'otherServicesSchema',
    },
});

const ClientOtherServiceType = mongoose.model("clientOtherServicesType", clientOtherServicesType);
module.exports = ClientOtherServiceType;