const placesService = require("../services/places.services");

exports.createPlace = (req, res, next) => {
    placesService.createPlace(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        });
    });
}