const userController = require("../controllers/users.controller");
const formidableMiddleware = require('express-formidable')
const { userAuthenticateToken } = require("../middlewares/auth");

const express = require('express');
const router = express.Router();

router.post("/save-and-edit-profile",
    formidableMiddleware(), userAuthenticateToken, userController.saveAndEditProfile);
router.post("/register",
    formidableMiddleware(), userController.registerUser);
router.post("/login", userController.login);
router.get("/user-profile", userAuthenticateToken, userController.userProfile);
router.post("/generate-otp", userController.otpLogin);
router.post("/verify-OTP", userController.verifyOTP);
router.post("/forgot-password", userController.forgetPassword);
router.post("/change-password", userAuthenticateToken, userController.changePassword);
router.post("/resend-OTP", userController.resendOTP);

module.exports = router;