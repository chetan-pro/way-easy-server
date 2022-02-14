const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientDaysOpen = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    day_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'objDays',
    },
});

const ClientDaysOpen = mongoose.model("clientDaysOpen", clientDaysOpen);
module.exports = ClientDaysOpen;