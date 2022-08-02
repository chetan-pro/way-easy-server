const placeController = require("../controllers/places.controller");

const express = require('express');
const router = express.Router();
const { authenticateToken, userAuthenticateToken } = require("../middlewares/auth");
const { route } = require("./users.routes");

router.get("/get-place", userAuthenticateToken, placeController.getPlaces);
router.get("/get-place/:id", userAuthenticateToken, placeController.getPlaces);

//booking

router.post("/create-booking-order", userAuthenticateToken, placeController.createBookingOrder);
router.post("/book-place", userAuthenticateToken, placeController.bookPlace);
router.get("/get-user-booking", userAuthenticateToken, placeController.userBooking);

router.get("/get-liked-places", userAuthenticateToken, placeController.getLikedPlaces);
router.post("/place-like-unlike", userAuthenticateToken, placeController.likeUnlike);
router.post("/place-rate-review", userAuthenticateToken, placeController.addRateReview);

router.get("/get-place-menu/:id", userAuthenticateToken, placeController.getPlaceMenu);
router.post("/order-food", userAuthenticateToken, placeController.orderFood);
router.get("/get-order-food", userAuthenticateToken, placeController.getOrderFood);



module.exports = router;