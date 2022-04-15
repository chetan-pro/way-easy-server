const placesService = require("../services/places.services");

exports.getPlaces = (req, res, next) => {
    placesService.getPlaces(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.bookPlace = (req, res, next) => {
    placesService.bookPlace(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.likeUnlike = (req, res, next) => {
    placesService.likeUnlike(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

exports.addRateReview = (req, res, next) => {
    placesService.addRateReview(req, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}