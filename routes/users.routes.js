const userController = require("../controllers/users.controller");
const formidableMiddleware = require('express-formidable')
const { userAuthenticateToken } = require("../middlewares/auth");

const express = require('express');
const router = express.Router();

router.post("/save-and-edit-profile",
    formidableMiddleware(), userController.saveAndEditProfile);
router.post("/register",
    formidableMiddleware(), userController.registerUser);
router.post("/login", userController.login);
router.get("/user-profile", userAuthenticateToken, userController.userProfile);
router.post("/generate-otp", userController.otpLogin);
router.post("/verify-OTP", userController.verifyOTP);

module.exports = router;