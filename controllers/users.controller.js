const bcryptjs = require('bcryptjs');
const userService = require("../services/users.services");

exports.saveAndEditProfile = (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    userService.saveAndEditProfile(req, req.files.image, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.login = (req, res, next) => {

    userService.login(
        req.body,
        (error, result) => {
            if (error) {
                return next(error);
            }
            return res.status(200).send({
                message: "Success",
                data: result
            });
        });
}

exports.registerUser = (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    userService.register(req.fields, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}


exports.userProfile = (req, res, next) => {
    userService.getUserProfile(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.otpLogin = (req, res, next) => {

    userService.createOtp(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.verifyOTP = (req, res, next) => {
    console.log(req.body);
    userService.verifyOTP(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Sucess",
            data: result
        })
    })
}
exports.resendOTP = (req, res, next) => {
    console.log(req.body);
    userService.resendOTP(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Sucess",
            data: result
        })
    })
}