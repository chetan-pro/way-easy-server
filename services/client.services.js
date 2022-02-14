const Client = require('../models/client.model');
const ClientPlaceType = require('../models/client_place_type.model');
const ClientPartyType = require('../models/client_party_type.model');
const ClientFoodType = require('../models/client_food_type.model');
const ClientOtherServicesType = require('../models/client_other_services.model');
const ClientDaysOpen = require('../models/client_days_open.model');
const Joi = require('joi');
const Helper = require('../services/helper');
const auth = require('../middlewares/auth');
const bcrypt = require("bcryptjs");
const { param } = require('../routes/client.routes');
const ClientSpaces = require('../models/client_spaces.model');


require("dotenv").config();
async function register(params, callback) {
    try {
        const owner_phonenumber = params.owner_phonenumber;
        const client = await Client.findOne({ owner_phonenumber });
        if (client) {
            return callback("Client alreeady registered.");
        } else {
            console.log("join validation");
            const reqObj = {
                email: Joi.string().email().required(),
                password: Joi.string().required(),
                place_name: Joi.string().trim().max(50).required(),
                owner_name: Joi.string().trim().max(50).required(),
                owner_phonenumber: Joi.string()
                    .trim()
                    .min(10)
                    .max(10)
                    .regex(/^[0-9]*$/)
                    .required(),
                manager_phonenumber: Joi.string()
                    .trim()
                    .min(10)
                    .max(10)
                    .regex(/^[0-9]*$/)
                    .required(),
                max_capacity: Joi.number().required(),
                from_timing: Joi.string().required(),
                to_timing: Joi.string().required(),
            }
            const schema = Joi.object(reqObj)
            const { error } = await schema.validate(params)
            if (error) {
                return callback(error);
            } else {
                const passwordHash = await bcrypt.hashSync(params.password, 10);
                const clientObj = {
                    place_name: params.place_name,
                    owner_name: params.owner_name,
                    owner_phonenumber: params.owner_phonenumber,
                    email: params.email,
                    password: passwordHash,
                    manager_phonenumber: params.manager_phonenumber,
                    max_capacity: params.max_capacity,
                    from_timing: params.from_timing,
                    to_timing: params.to_timing,
                    token: auth.generateAccessToken(params.owner_phonenumber)
                }
                await Client.create(clientObj)
                    .then((data) =>
                        callback(null, data))
                    .catch((error) =>
                        callback(null, error))
            }
        }
    } catch (error) {
        return callback(error);
    }
}

async function addClientTypeOfPlace(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            place_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = await schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            place_id: params.body.place_id
        }
        await ClientPlaceType.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientTypeOfPlace(params, callback) {
    try {
        const clientId = params.authId;
        await ClientPlaceType.find({ clientId }).populate('place_id').then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function removeClientTypeOfPlace(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            place_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            place_id: params.body.place_id
        }
        await ClientPlaceType.remove(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientTypeOfParty(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            party_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            party_id: params.body.party_id
        }
        console.log(obj);
        await ClientPartyType.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientTypeOfParty(params, callback) {
    try {
        const clientId = params.authId;
        await ClientPartyType.find({ clientId }).populate('party_id').then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function removeClientTypeOfParty(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            party_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            party_id: params.body.party_id
        }
        await ClientPartyType.remove(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addPlaceAddress(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            address: Joi.string().required(),
            locality: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = await schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await Client.findByIdAndUpdate(clientId, {...params.body, clientId }, { new: true })
            .then((response) => {
                return callback(null, response);
            }).catch((error) => {
                return callback(error);
            });
    } catch (error) {
        return callback(error);
    }
}

async function getClientTypeOfFood(params, callback) {
    try {
        const clientId = params.authId;
        await ClientFoodType.find({ clientId }).populate('food_id').then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function removeClientTypeOfFood(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            food_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            food_id: params.body.food_id
        }
        await ClientFoodType.remove(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientTypeOfFood(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            food_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            food_id: params.body.food_id
        }
        console.log(obj);
        await ClientFoodType.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}
async function getClientTypeOfOtherService(params, callback) {
    try {
        const clientId = params.authId;
        await ClientOtherServicesType.find({ clientId }).populate('service_id').then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function removeClientTypeOfOtherService(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            service_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            service_id: params.body.service_id
        }
        await ClientOtherServicesType.remove(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientTypeOfOtherService(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            service_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            service_id: params.body.service_id
        }
        console.log(obj);
        await ClientOtherServicesType.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientDaysOpen(params, callback) {
    try {
        const clientId = params.authId;
        await ClientDaysOpen.find({ clientId }).populate('day_id').then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function removeClientDaysOpen(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            day_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            day_id: params.body.day_id
        }
        await ClientDaysOpen.remove(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientDaysOpen(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            day_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            day_id: params.body.day_id
        }
        console.log(obj);
        await ClientDaysOpen.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientSpaces(params, images, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            space_name: Joi.string().required(),
            space_description: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.fields);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            space_name: params.fields.space_name,
            space_description: params.fields.space_description
        }
        console.log(obj);
        await ClientSpaces.create(obj).then((response) => {
            return callback(null, { response: response });
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}




module.exports = {
    register,
    addPlaceAddress,
    addClientTypeOfPlace,
    getClientTypeOfPlace,
    removeClientTypeOfPlace,
    addClientTypeOfParty,
    getClientTypeOfParty,
    removeClientTypeOfParty,
    getClientTypeOfFood,
    addClientTypeOfFood,
    removeClientTypeOfFood,
    getClientTypeOfOtherService,
    addClientTypeOfOtherService,
    removeClientTypeOfOtherService,
    getClientDaysOpen,
    addClientDaysOpen,
    removeClientDaysOpen,
    addClientSpaces,
}