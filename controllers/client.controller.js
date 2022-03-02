const clientService = require("../services/client.services");


exports.login = (req, res, next) => {
    const { owner_number, password } = req.body;
    clientService.login({
        owner_number,
        password
    }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.registerClient = (req, res, next) => {

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

exports.editClient = (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    clientService.clientEditProfile(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.getClients = (req, res, next) => {
    console.log(req.body);
    console.log(req.fields);
    clientService.getClients(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.clientStatus = (req, res, next) => {
    clientService.clientStatus(req, (error, result) => {
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

exports.editClientSpaces = (req, res, next) => {
    clientService.editClientSpaces(req, req.files, (error, result) => {
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
exports.getClientSpaces = (req, res, next) => {
    clientService.getClientSpaces(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.deleteClientSpace = (req, res, next) => {
    clientService.deleteClientSpaces(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addRemoveClientImages = (req, res, next) => {
    clientService.addRemoveClientImages(req, req.files, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addClientDJ = (req, res, next) => {
    clientService.addClientDJ(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getClientDJ = (req, res, next) => {
    clientService.getClientDJ(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.editClientDJ = (req, res, next) => {
    clientService.editClientDJ(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.deleteClientDJ = (req, res, next) => {
    clientService.deleteClientDJ(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addClientDecorator = (req, res, next) => {
    clientService.addClientDecorator(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getClientDecorator = (req, res, next) => {
    clientService.getClientDecoration(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.editClientDecorator = (req, res, next) => {
    clientService.editClientDecorator(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.deleteClientDecorator = (req, res, next) => {
    clientService.deleteClientDecorator(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}