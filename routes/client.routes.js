const clientController = require("../controllers/client.controller");
const formidableMiddleware = require('express-formidable')
const express = require('express');

const { authenticateToken } = require("../middlewares/auth");
const router = express.Router();

router.post("/register-client", clientController.registerClient);
router.post("/login", clientController.login);
router.post("/edit-client", authenticateToken, clientController.editClient);
router.get("/get-client", authenticateToken, clientController.getClients);
router.post("/change-client-status", authenticateToken, clientController.clientStatus)
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
router.get("/get-spaces", authenticateToken, clientController.getClientSpaces);
router.post("/edit-spaces", authenticateToken, formidableMiddleware(), clientController.addClientSpaces);
router.post("/delete-spaces", authenticateToken, clientController.deleteClientSpace);
router.post("/add-remove-client-images", authenticateToken, formidableMiddleware(), clientController.addRemoveClientImages);

// client decorator 
router.post("/add-client-decorator", authenticateToken, clientController.addClientDecorator);
router.post("/edit-client-decorator", authenticateToken, clientController.editClientDecorator);
router.post("/delete-client-decorator", authenticateToken, clientController.deleteClientDecorator);
router.get("/get-client-decorator", authenticateToken, clientController.getClientDecorator);

// client dj 
router.post("/add-client-dj", authenticateToken, clientController.addClientDJ);
router.post("/edit-client-dj", authenticateToken, clientController.editClientDJ);
router.post("/delete-client-dj", authenticateToken, clientController.deleteClientDJ);
router.get("/get-client-dj", authenticateToken, clientController.getClientDJ);

// client food menu
router.post("/add-menu-food", authenticateToken, clientController.addMenuFood);
router.get("/get-all-menu-food", authenticateToken, clientController.getAllMenuFood);
router.get("/get-categories-menu-food", authenticateToken, clientController.getCategoriesMenuFood);
router.delete("/delete-menu-food", authenticateToken, clientController.deleteMenuFood);
router.post("/update-menu-food", authenticateToken, clientController.updateMenuFood);


module.exports = router;