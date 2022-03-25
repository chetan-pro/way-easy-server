const placeController = require("../controllers/places.controller");

const express = require('express');
const router = express.Router();
const { authenticateToken, userAuthenticateToken } = require("../middlewares/auth");

router.get("/get-place", userAuthenticateToken, placeController.getPlaces);
router.get("/get-place/:id", userAuthenticateToken, placeController.getPlaces);

//booking
router.post("/book-place", userAuthenticateToken, placeController.bookPlace);


module.exports = router;