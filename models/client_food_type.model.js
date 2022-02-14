const mongoose = require('mongoose');
const { Schema } = mongoose;

const clientFoodType = new Schema({
    client_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client',
    },
    food_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'foodType',
    },
});

const ClientFoodType = mongoose.model("clientFoodType", clientFoodType);
module.exports = ClientFoodType;