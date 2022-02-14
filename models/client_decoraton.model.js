const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientDecoration = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    decorator_name: {
        type: String,
    },
    decorator_description: {
        type: String,
    },
});

const ClientDecoration = mongoose.model("clientDecoration", clientDecoration);
module.exports = ClientDecoration;