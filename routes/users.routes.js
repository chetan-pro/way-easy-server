const userController = require("../controllers/users.controller");
const formidableMiddleware = require('express-formidable')

const express = require('express');
const router = express.Router();

router.post("/save-and-edit-profile",
    formidableMiddleware(), userController.saveAndEditProfile);
router.post("/login", userController.login);
router.get("/user-profile", userController.userProfile);
router.post("/generate-otp", userController.otpLogin);
router.post("/verify-OTP", userController.verifyOTP);

module.exports = router;