const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const path = require('path')
const Joi = require('joi');
const { MongoClient, ObjectId } = require("mongodb");
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
    if (user) {
        if (bcrypt.compareSync(password, user.password)) {
            let obj = {
                id: user.id,
                token: user.token
            }
            return callback(null, obj);
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

async function register(params, callback) {
    try {
        console.log(params);
        const owner_phonenumber = params.owner_phonenumber;
        const user = await User.findOne({ owner_phonenumber });
        if (user) {
            return callback("User alreeady registered.");
        } else {
            console.log("join validation");
            const reqObj = {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                username: Joi.string().trim().max(50).required(),
                mobile_number: Joi.string()
                    .trim()
                    .min(10)
                    .max(10)
                    .regex(/^[0-9]*$/)
                    .required(),

            }
            const schema = Joi.object(reqObj)
            const { error } = await schema.validate(params)
            if (error) {
                return callback(error);
            } else {
                const passwordHash = await bcrypt.hashSync(params.password, 10);
                const userObj = {
                    username: params.username,
                    mobile_number: params.mobile_number,
                    email: params.email,
                    password: passwordHash,
                    token: auth.generateAccessToken(params.owner_phonenumber),
                    verified: false
                }
                await User.create(userObj)
                    .then((data) => {
                        return callback(null, data);
                    })
                    .catch((error) =>
                        callback(null, error))
            }
        }
    } catch (error) {
        return callback(error);
    }
}

async function getUserProfile(params, callback) {
    try {
        console.log(params);
        User.findOne({ _id: params.authId }).then((data) => {
                if (!data.verified) {
                    return callback("You account is not verifed");
                }
                return callback(null, data);
            })
            .catch((error) =>
                callback(null, error));
    } catch (error) {
        return callback(error);
    }
}

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
    User
        .findOne({ mobile_number: params.mobile_number })
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
    const reqParam = params.body
    const reqObj = {
        mobile_number: Joi.string().email().required(),
        otp: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(reqParam)
    if (error) {
        return callback(error);
    } else {
        OTP.findOne({ reqParam })
            .then((data) => {
                console.log(data.user);
                if (data) {
                    User.findOne({ _id: ObjectId(data.user_id) }).then((data) => {
                        console.log(data);
                        data.verified = true;
                        const _id = data.id;
                        User.findByIdAndUpdate(
                            _id, {...data, _id }, { new: true }
                        ).then((response) => {
                            return callback(null, "Your account is verified");
                        }).catch((error) => {
                            return callback(error);
                        })
                    })
                } else {
                    return callback("Invalid OTP");
                }
            })
            .catch((error) => callback(error));
    }
}

module.exports = {
    login,
    saveAndEditProfile,
    createOtp,
    verifyOTP,
    register,
    getUserProfile
}