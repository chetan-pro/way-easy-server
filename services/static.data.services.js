const TypeOfPlace = require('../models/type_of_place.model');
const TypeOfParty = require('../models/type_of_parties.model');
const OtherServices = require('../models/other_services.model');
const ObjDays = require('../models/obj_days.model');
const Joi = require('joi');
const FoodType = require('../models/food_type.model');
const PrivacyType = require('../models/privacy_type.model');
const TypeOfSpace = require('../models/type_of_spaces.model');
require("dotenv").config();

async function addTypeOfPlace(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const typeOfPlace = new TypeOfPlace(params);
    typeOfPlace
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getTypeOfPlace(params, callback) {
    await TypeOfPlace.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

async function addTypeOfParties(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const typeOfParty = new TypeOfParty(params);
    typeOfParty
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getTypeOfParties(params, callback) {
    await TypeOfParty.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

async function addOtherServices(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const otherServices = new OtherServices(params);
    otherServices
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getOtherServices(params, callback) {
    await OtherServices.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}
async function addDays(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        full_name: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const days = new ObjDays(params);
    days
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getDays(params, callback) {
    await ObjDays.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

async function addFoodType(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const foodType = new FoodType(params);
    foodType
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getFoodType(params, callback) {
    await FoodType.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

async function addPrivacyType(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const privacyType = new PrivacyType(params);
    privacyType
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getPrivacyType(params, callback) {
    await PrivacyType.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

async function addTypeOfSpaces(params, callback) {
    console.log("params");
    console.log(params);
    const reqObj = {
        name: Joi.string().required(),
        description: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = await schema.validate(params)
    if (error) {
        return callback(error);
    }
    const typeOfSpace = new TypeOfSpace(params);
    typeOfSpace
        .save()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}

async function getTypeOfSpaces(params, callback) {
    await TypeOfSpace.find().then((response) => {
        return callback(null, response);
    }).catch((error) => {
        return callback(error);
    });
}

module.exports = {
    addTypeOfPlace,
    getTypeOfPlace,
    addTypeOfParties,
    getTypeOfParties,
    addOtherServices,
    getOtherServices,
    addDays,
    getDays,
    addFoodType,
    getFoodType,
    addPrivacyType,
    getPrivacyType,
    addTypeOfSpaces,
    getTypeOfSpaces,
}