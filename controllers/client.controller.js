const clientService = require("../services/client.services");

exports.registerClient = (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    clientService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addPlaceAddress = (req, res, next) => {
    clientService.addPlaceAddress(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}


exports.addClientTypeOfPlace = (req, res, next) => {
    clientService.addClientTypeOfPlace(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClientTypeOfPlace = (req, res, next) => {
    clientService.getClientTypeOfPlace(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.removeClientTypeOfPlace = (req, res, next) => {
    clientService.removeClientTypeOfPlace(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addClientTypeOfParty = (req, res, next) => {
    clientService.addClientTypeOfParty(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClientTypeOfParty = (req, res, next) => {
    clientService.getClientTypeOfParty(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.removeClientTypeOfParty = (req, res, next) => {
    clientService.removeClientTypeOfParty(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addClientTypeOfFood = (req, res, next) => {
    clientService.addClientTypeOfFood(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClientTypeOfFood = (req, res, next) => {
    clientService.getClientTypeOfFood(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.removeClientTypeOfFood = (req, res, next) => {
    clientService.removeClientTypeOfFood(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addClientTypeOfOtherService = (req, res, next) => {
    clientService.addClientTypeOfOtherService(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClientTypeOfOtherService = (req, res, next) => {
    clientService.getClientTypeOfOtherService(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.removeClientTypeOfOtherService = (req, res, next) => {
    clientService.removeClientTypeOfOtherService(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addClientDaysOpen = (req, res, next) => {
    clientService.addClientDaysOpen(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClientDaysOpen = (req, res, next) => {
    clientService.getClientDaysOpen(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.removeClientDaysOpen = (req, res, next) => {
    clientService.removeClientDaysOpen(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addClientSpaces = (req, res, next) => {
    clientService.addClientSpaces(req, req.files, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}