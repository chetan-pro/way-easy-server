const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const path = require('path')

const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");
const crypto = require("crypto");
const otpGenerator = require("otp-generator");
const fast2sms = require('fast-two-sms');
const moment = require('moment');
const Helper = require('../services/helper');
require("dotenv").config();

async function login({ mobileNumber, password }, callback) {
    const user = await User.findOne({ mobileNumber });
    console.log(user);
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            return callback(null, {...user.toJSON() });
        } else {
            return callback({
                message: "Password is not matched",
            })
        }
    } else {
        return callback({
            message: "Invalid Username/Password!",
        })
    }
};

async function saveAndEditProfile(params, image, callback) {
    const mobileNumber = params.mobile_number;
    const { _id } = await User.findOne({ mobileNumber });
    if (_id && image && image.size > 0) {
        console.log("i am in");
        const extension = image.type;
        const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
        if (image && (!imageExtArr.includes(extension))) {
            return callback('imageInvalid');
        }
        const imageName = image ? `${moment().unix()}${path.extname(image.name)}` : '';
        if (image) {
            await Helper.ImageUpload(image, imageName);
            params['image'] = imageName;
        }
    } else {
        return callback("User not exist");
    }
    await User.findByIdAndUpdate(
        _id, {...params, _id }, { new: true }
    ).then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    })
}

async function createOtp(params, callback) {
    params['token'] = auth.generateAccessToken(params.mobileNumber);
    const user = new User(params);
    user
        .save()
        .then((response) => {
            console.log("response");
            console.log(response);
            const otp = otpGenerator.generate(4, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false
            });
            const otpObject = {
                otp: otp,
                mobile_number: response.mobile_number,
                user_id: response.id
            }
            const otpSchema = new OTP(otpObject);
            console.log("otp response");
            console.log(otpSchema);
            otpSchema
                .save()
                .then((response) => {
                    var options = {
                        authorization: `${process.env.fast2SmsApiKey}`,
                        message: `Your sign up otp is ${response.otp}`,
                        numbers: [response.mobile_number]
                    }
                    fast2sms.sendMessage(options)
                        .then(function(data) {
                            console.log('data................', data);
                            return callback(null, data);
                        }).catch(function(error) {
                            console.log('err.................', error);
                            return callback("Unable to send message");
                        });
                }).catch((error) => {
                    return callback(error);
                });
        }).catch((error) => {
            return callback(error);
        });
}

async function verifyOTP(params, callback) {
    let [hashValue, expires] = params.hash.split('.');

    let now = Date.now();
    if (now > parseInt(expires)) return callback("OTP Expired");

    let data = `
                                                $ { params.phone }.$ { params.otp }.$ { expires }
                                                `;
    let newCalculateHash = crypto.createHmac("sha256", "WAY_EASY_KEY").update(data).digest("hex");
    if (newCalculateHash === hashValue) {
        return callback(null, "Sucess");
    }
    return callback("Invalid OTP");
}

module.exports = {
    login,
    saveAndEditProfile,
    createOtp,
    verifyOTP
}