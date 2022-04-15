// const ObjDays = require('../models/obj_days.model');
const Joi = require('joi');

require("dotenv").config();
const { Sequelize } = require("sequelize");

const { MenuFoodCategory, PartyType, PlaceType } = require('./../models')

// async function addTypeOfPlace(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const typeOfPlace = new TypeOfPlace(params);
//     typeOfPlace
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

async function getTypeOfPlace(params, callback) {
    await PlaceType.findAll({
        attributes: {
            include: [
                [
                    Sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM client_place_types AS clientPlaceType
                        WHERE
                        clientPlaceType.place_type_id = PlaceType.id 
                    )`),
                    'count'
                ]
            ],
        },
    }).then((response) => {
        return callback(null, { rows: response });
    }).catch((error) => {
        return callback(error);
    });
}

// async function addTypeOfParties(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const typeOfParty = new TypeOfParty(params);
//     typeOfParty
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

async function getTypeOfParties(params, callback) {
    await PartyType.findAll().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

// async function addOtherServices(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const otherServices = new OtherServices(params);
//     otherServices
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function getOtherServices(params, callback) {
//     await OtherServices.find().then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     });
// }
// async function addDays(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         full_name: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const days = new ObjDays(params);
//     days
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function getDays(params, callback) {
//     await ObjDays.find().then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     });
// }

// async function addFoodType(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const foodType = new FoodType(params);
//     foodType
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function getFoodType(params, callback) {
//     await FoodType.find().then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     });
// }

// async function addPrivacyType(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const privacyType = new PrivacyType(params);
//     privacyType
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function getPrivacyType(params, callback) {
//     await PrivacyType.find().then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     });


async function addFoodMenuCategories(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        category_name: Joi.string().required(),
        category_description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = schema.validate(params)
    if (error) {
        return callback(error);
    }
    await MenuFoodCategory.create(params)
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getFoodMenuCategories(params, callback) {
    await MenuFoodCategory.findAll().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

// async function addTypeOfSpaces(params, callback) {
//     console.log("params");
//     console.log(params);
//     const reqObj = {
//         name: Joi.string().required(),
//         description: Joi.string().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = await schema.validate(params)
//     if (error) {
//         return callback(error);
//     }
//     const typeOfSpace = new TypeOfSpace(params);
//     typeOfSpace
//         .save()
//         .then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         });
// }

// async function getTypeOfSpaces(params, callback) {
//     await TypeOfSpace.find().then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     });
// }

module.exports = {
    //     addTypeOfPlace,
    getTypeOfPlace,
    //     addTypeOfParties,
    getTypeOfParties,
    //     addOtherServices,
    //     getOtherServices,
    //     addDays,
    //     getDays,
    //     addFoodType,
    //     getFoodType,
    //     addPrivacyType,
    //     getPrivacyType,
    getFoodMenuCategories,
    addFoodMenuCategories,
}