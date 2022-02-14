const staticDataServices = require("../services/static.data.services");

exports.addTypeOfPlace = (req, res, next) => {
    staticDataServices.addTypeOfPlace(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getTypeOfPlace = (req, res, next) => {
    staticDataServices.getTypeOfPlace(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addTypeOfParties = (req, res, next) => {
    staticDataServices.addTypeOfParties(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getTypeOfParties = (req, res, next) => {
    staticDataServices.getTypeOfParties(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}

exports.addOtherServices = (req, res, next) => {
    staticDataServices.addOtherServices(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getOtherServices = (req, res, next) => {
    staticDataServices.getOtherServices(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addDays = (req, res, next) => {
    staticDataServices.addDays(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getDays = (req, res, next) => {
    staticDataServices.getDays(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addFoodType = (req, res, next) => {
    staticDataServices.addFoodType(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getFoodType = (req, res, next) => {
    staticDataServices.getFoodType(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addTypeOfSpaces = (req, res, next) => {
    staticDataServices.addTypeOfSpaces(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getTypeOfSpaces = (req, res, next) => {
    staticDataServices.getTypeOfSpaces(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.addPrivacyType = (req, res, next) => {
    staticDataServices.addPrivacyType(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}
exports.getPrivacyType = (req, res, next) => {
    staticDataServices.getPrivacyType(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}