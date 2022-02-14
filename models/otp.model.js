const mongoose = require('mongoose');
const { Schema } = mongoose;

const otpSchema = new Schema({
    otp: {
        type: String,
    },
    mobile_number: {
        type: Number,
        minlength: 10,
        maxlength: 10
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const OTP = mongoose.model("otp", otpSchema);
module.exports = OTP;