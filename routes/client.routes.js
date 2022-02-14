const clientController = require("../controllers/client.controller");
const formidableMiddleware = require('express-formidable')
const express = require('express');

const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/register-client", clientController.registerClient);
router.post("/add-place-address", authenticateToken, clientController.addPlaceAddress);

// client type of places 
router.post("/add-place-type", authenticateToken, clientController.addClientTypeOfPlace);
router.get("/get-place-type", authenticateToken, clientController.getClientTypeOfPlace);
router.post("/remove-place-type", authenticateToken, clientController.removeClientTypeOfPlace);

// client type of party 
router.post("/add-party-type", authenticateToken, clientController.addClientTypeOfParty);
router.get("/get-party-type", authenticateToken, clientController.getClientTypeOfParty);
router.post("/remove-party-type", authenticateToken, clientController.removeClientTypeOfParty);

// client type of food 
router.post("/add-food-type", authenticateToken, clientController.addClientTypeOfFood);
router.get("/get-food-type", authenticateToken, clientController.getClientTypeOfFood);
router.post("/remove-food-type", authenticateToken, clientController.removeClientTypeOfFood);

// client type of days open
router.post("/add-day-open", authenticateToken, clientController.addClientDaysOpen);
router.get("/get-day-open", authenticateToken, clientController.getClientDaysOpen);
router.post("/remove-day-open", authenticateToken, clientController.removeClientDaysOpen);

// client type of other services 
router.post("/add-other-service-type", authenticateToken, clientController.addClientTypeOfOtherService);
router.get("/get-other-service-type", authenticateToken, clientController.getClientTypeOfOtherService);
router.post("/remove-other-service-type", authenticateToken, clientController.removeClientTypeOfOtherService);

// client spaces 
router.post("/add-spaces", authenticateToken, formidableMiddleware(), clientController.addClientSpaces);


module.exports = router;