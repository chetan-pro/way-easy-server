const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientImages = new Schema({
    client_space_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    image_url: {
        type: String,
    },
});



const ClientImages = mongoose.model("clientImages", clientImages);
module.exports = ClientImages;