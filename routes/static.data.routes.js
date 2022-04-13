const staticDataController = require("../controllers/static.data.controller");
const express = require('express');
const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();


// type of place
router.get("/get-type-of-place", staticDataController.getTypeOfPlace);
router.post("/add-type-of-place", staticDataController.addTypeOfPlace);

// type of party
router.get("/get-type-of-parties", staticDataController.getTypeOfParties);
router.post("/add-type-of-parties", staticDataController.addTypeOfParties);

// other services
router.get("/get-other-services", staticDataController.getOtherServices);
router.post("/add-other-services", staticDataController.addOtherServices);

// days
router.get("/get-days", staticDataController.getDays);
router.post("/add-days", staticDataController.addDays);

// Food type
router.get("/get-food-type", staticDataController.getFoodType);
router.post("/add-food-type", staticDataController.addFoodType);

// type of spaces
router.get("/get-type-of-spaces", staticDataController.getTypeOfSpaces);
router.post("/add-type-of-spaces", staticDataController.addTypeOfSpaces);

// Food type
router.get("/get-privacy-type", staticDataController.getPrivacyType);
router.post("/add-privacy-type", staticDataController.addPrivacyType);

//Food Menu Categories
router.get("/get-food-menu-categories", staticDataController.getFoodMenuCategories);
router.post("/add-food-menu-categories", staticDataController.addFoodMenuCategories);


module.exports = router;
module.exports = router;