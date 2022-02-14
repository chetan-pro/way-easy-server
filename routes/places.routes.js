const placeController = require("../controllers/places.controller");

const express = require('express');
const router = express.Router();

router.post("/create-place", placeController.createPlace);

module.exports = router;