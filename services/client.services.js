const Joi = require('joi');
const moment = require('moment');
const path = require('path')
const { Op } = require('sequelize');

const Helper = require('../services/helper');
const auth = require('../middlewares/auth');
const bcrypt = require("bcryptjs");
const { Client, ClientPlaceType, PlaceType, ClientPartyType, PartyType, ClientFoodTypes, FoodType, ClientWeekDays, WeekDays, ClientOtherServices, OtherServices, ClientDJ, PrivacyType, ClientDecorator, ClientSpace, SpaceImage, ClientImages, MenuFood, MenuFoodCategory, Booking, User, OrderFood } = require('../models');
const { DELETE } = require('./constant');

require("dotenv").config();
async function login(
    params,
    callback) {
    const reqParam = params.body
    const reqObj = {
        email: Joi.string().required(), //[
        password: Joi.string().required()
    }
    const schema = Joi.object(reqObj)
    const { error } = schema.validate(reqParam)
    if (error) {
        console.log(error)
        return callback(error);
    } else {
        let client = await Client.findOne({
            where: {
                email: reqParam.email,
                status: {
                    [Op.not]: DELETE,
                },
            },
        }).then((customerData) => customerData)

        if (client) {
            bcrypt.compare(
                reqParam.password,
                client.password,
                async(err, result) => {
                    console.log("yaha tk aya");
                    if (err) {
                        console.log("eerr yaha tk aya");
                        return callback(error);
                    }
                    if (result) {
                        console.log("result yaha tk aya");
                        console.log(client);
                        console.log(result);
                        return callback(null, client);

                    } else {
                        console.log("err msg yaha tk aya");
                        return callback('username password not match');
                    }
                })

        } else {
            return callback('user name not exist');
        }

    }
};

async function register(params, callback) {
    try {
        const client = await Client.findOne({
            where: {
                email: params.email,
                status: {
                    [Op.not]: DELETE,
                },
            },
        }).then((clientEmailData) => clientEmailData)
        if (client) {
            return callback("Client alreeady registered.");
        } else {
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
            const { error } = schema.validate(params)
            if (error) {
                return callback(error);
            } else {


                const passwordHash = bcrypt.hashSync(params.password, 10);
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
                    reset_token: auth.generateAccessToken(params.owner_phonenumber),
                    status: true
                }
                await Client.create(clientObj)
                    .then(async(result) =>
                        callback(null, result))
                    .catch((e) => {
                        console.log(e)
                        callback(e);
                    })
            }
        }
    } catch (error) {
        return callback(error);
    }
}

async function clientEditProfile(params, callback) {
    const _id = params.authId;
    console.log(_id);
    if (!_id) {
        return callback("User doesn't exist");
    }
    const reqObj = {
        email: Joi.string().email().required(),
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
    const { error } = schema.validate(params.body)
    if (error) {
        return callback(error);
    }


    await Client.update(
        params.body, {
            where: {
                id: _id
            },
        }
    ).then(async(response) => {
        if (response) {
            const responseData = await Client.findByPk(_id);
            return callback(null, responseData);
        } else {
            return callback("Something went wrong.");
        }
    }).catch((error) => {
        return callback(error);
    })
}

async function getClients(params, callback) {
    const clientId = params.query.id;
    const placeName = params.query.name;
    if (clientId) {
        console.log(true);
        await Client.findOne({
            where: {
                id: clientId,
                status: {
                    [Op.not]: DELETE,
                },
            },
        }).then((response) => {
            console.log(response);
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    } else if (placeName) {
        await Client.findAll({
            where: {
                place_name: {
                    [Op.like]: `%${placeName}%`,
                },
                status: {
                    [Op.not]: DELETE,
                },
            },
            include: [{
                model: ClientImages,
                client_id: {
                    [Op.eq]: ['id'],
                }
            }, ]
        }).then((response) => {
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    } else {
        await Client.findAll({
            where: {
                status: {
                    [Op.not]: DELETE,
                },
            },
            include: [{
                model: ClientImages,
                client_id: {
                    [Op.eq]: ['id'],
                }
            }, ]
        }).then((response) => {
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    }
}

async function clientDetails(params, callback) {
    const clientId = params.authId;
    await Client.findOne({
        where: {
            id: clientId,
            status: {
                [Op.not]: DELETE,
            },
        },
    }).then((response) => {
        console.log(response);
        return callback(null, response)
    }).catch((error) => {
        return callback(error)
    })

}

async function clientStatus(params, callback) {
    const reqObj = {
        status: Joi.bool().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = schema.validate(params.body);
    if (error) {
        return callback(error);
    }
    const _id = params.authId;
    await Client.findOne({
        where: {
            id: _id,
            status: {
                [Op.not]: DELETE,
            },
        }
    }).then((response) => {
        response.status = params.body.status;
        response.save().then((data) => callback(null, data)).catch((e) => callback(e));
    }).catch((error) => {
        return callback(error)
    })

}

async function addPlaceAddress(params, callback) {
    try {
        const clientId = params.authId;
        const reqObj = {
            address: Joi.string().required(),
            locality: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await Client.findOne({
                where: {
                    id: clientId,
                    status: {
                        [Op.not]: DELETE,
                    },
                }
            }, )
            .then((response) => {
                response.address = params.body.address;
                response.locality = params.body.locality;
                response.save().then((data) => callback(null, data)).catch((error) => callback(error))
            }).catch((error) => {
                return callback(error);
            });
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
            place_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = await schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            place_type_id: params.body.place_type_id
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
        console.log(clientId);
        await ClientPlaceType.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: PlaceType,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['place_type_id'],
                }
            }, ]
        }).then((response) => {
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
            client_place_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await ClientPlaceType.destroy({
            where: {
                id: params.body.client_place_type_id
            }
        }).then((response) => {
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
            party_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            party_type_id: params.body.party_type_id
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
        await ClientPartyType.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: PartyType,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['place_type_id'],
                }
            }]
        }).then((response) => {
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
        const reqObj = {
            client_party_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }

        ClientPartyType.destroy({
            where: {
                id: params.body.client_party_type_id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientTypeOfFood(params, callback) {
    try {
        const clientId = params.authId;
        await ClientFoodTypes.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: FoodType,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['food_type_id'],
                }
            }]
        }).then((response) => {
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
        const reqObj = {
            client_food_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await ClientFoodTypes.destroy({
            where: {
                id: params.body.client_food_type_id
            }
        }).then((response) => {
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
            food_type_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            food_type_id: params.body.food_type_id
        }
        console.log(obj);
        await ClientFoodTypes.create(obj).then((response) => {
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
        await ClientOtherServices.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: OtherServices,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['other_service_id'],
                }
            }]
        }).then((response) => {
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
        const reqObj = {
            client_other_service_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }

        await await ClientOtherServices.destroy({
            where: {
                id: params.body.client_other_service_id
            }
        }).then((response) => {
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
            other_service_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            other_service_id: params.body.other_service_id
        }
        console.log(obj);
        await ClientOtherServices.create(obj).then((response) => {
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
        await ClientWeekDays.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: WeekDays,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['week_day_id'],
                }
            }]
        }).then((response) => {
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
            client_week_day_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }

        await ClientWeekDays.destroy({
            where: {
                id: params.body.client_week_day_id
            }
        }).then((response) => {
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
            week_day_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            week_day_id: params.body.week_day_id
        }
        console.log(obj);
        await ClientWeekDays.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientDJ(params, callback) {
    const clientId = params.authId;
    const _id = params.query.id;
    if (_id) {
        await ClientDJ.findOne({
            where: {
                client_id: clientId,
                id: _id
            },
            include: [{
                model: PrivacyType,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['privacy_type_id'],
                }
            }]
        }).then((response) => {

            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    } else {
        await ClientDJ.findAll({
            where: {
                client_id: clientId,
            },
            include: [{
                model: PrivacyType,
                attributes: ['id', 'name'],
                id: {
                    [Op.eq]: ['privacy_type_id'],
                }
            }]
        }).then((response) => {
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    }
}

async function deleteClientDJ(params, callback) {
    try {
        const reqObj = {
            client_dj_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await ClientDJ.destroy({
            where: {
                id: params.body.client_dj_id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function editClientDJ(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const _id = params.body.dj_id;
        await ClientDJ.update(params.body, {
            where: {
                id: _id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientDJ(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            dj_name: Joi.string().required(),
            dj_description: Joi.string().required(),
            privacy_type_id: Joi.string().required(),
            charge_per_hour: Joi.number().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            dj_name: params.body.dj_name,
            dj_description: params.body.dj_description,
            privacy_type_id: params.body.privacy_type_id,
            charge_per_hour: params.body.charge_per_hour,
        }
        await ClientDJ.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientDecoration(params, callback) {
    const clientId = params.authId;
    const _id = params.query.id;
    if (_id) {
        await ClientDecorator.findOne({
            where: {
                id: _id
            }
        }).then((response) => {

            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    } else {
        await ClientDecorator.findAll({
            where: {
                client_id: clientId
            }
        }).then((response) => {
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    }
}

async function deleteClientDecorator(params, callback) {
    try {
        const reqObj = {
            client_decorator_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const clientId = params.authId;
        const _id = params.body.client_decorator_id;
        await ClientDecorator.destroy({
            where: {
                id: _id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function editClientDecorator(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const _id = params.body.decorator_id;
        await ClientDecorator.update(params.body, {
            where: {
                id: _id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addClientDecorator(params, callback) {
    try {
        const clientId = params.authId;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            decorator_name: Joi.string().required(),
            decorator_description: Joi.string().required(),
            charge: Joi.number().required()
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        const obj = {
            client_id: clientId,
            decorator_name: params.body.decorator_name,
            decorator_description: params.body.decorator_description,
            charge: params.body.charge
        }
        console.log(obj);
        await ClientDecorator.create(obj).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function getClientSpaces(params, callback) {
    const clientId = params.authId;
    const _id = params.query.id;
    if (_id) {
        await ClientSpace.findOne({
            where: { client_id: clientId, id: _id },
            include: [{
                model: SpaceImage,
                client_space_id: {
                    [Op.eq]: ['id'],
                }
            }, ]
        }).then((response) => {

            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
    } else {
        await ClientSpace.findAll({
            where: { client_id: clientId },
            include: [{
                model: SpaceImage,
                client_space_id: {
                    [Op.eq]: ['id'],
                }
            }, ]
        }).then((response) => {
            return callback(null, response)
        }).catch((error) => {
            return callback(error)
        })
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

        let imagesArr = [];
        let clientSpaces = new ClientSpace(obj);
        await clientSpaces.save().then(async(response) => {
            if (response && Object.keys(images).length > 0) {
                console.log("i am in");
                let result = Object.keys(images).map((key) => {
                    const extension = images[key].type;
                    const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
                    if (images[key] && (!imageExtArr.includes(extension))) {
                        return callback('imageInvalid');
                    }
                    const imageName = images[key] ? `${ moment().unix() }${ path.extname(images[key].name) }` : '';
                    if (images[key]) {
                        Helper.ImageUpload(images[key], imageName);
                        params['image'] = imageName;
                        let newImagesUpload = new SpaceImage({ client_space_id: response.id, image_url: imageName });
                        return newImagesUpload.save().then((res) => {
                            return res;
                        }).catch((error) => {
                            return callback(error);
                        })
                    }
                })
                await Promise.all(result).then((res) => {
                    clientSpaces.space_images = res;

                    clientSpaces.save().then((data) => {
                        callback(null, data);
                    });
                })


            } else {
                console.log("BHai me chla")
                return callback(null, { response: response });
            }
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function editClientSpaces(params, images, callback) {
    try {
        const clientId = params.authId;
        const spaceId = params.fields.space_id;
        console.log("clientId mili");
        console.log(clientId);
        const reqObj = {
            space_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.fields);
        if (error) {
            return callback(error);
        }

        let removeImagesId = params.fields.remove_images ? params.fields.remove_images.split(',') : [];


        let imagesArr = [];
        await ClientSpaces.findOne({ _id: spaceId }).then(async(response) => {

            console.log(response);
            if (removeImagesId.length > 0) {
                removeImagesId.forEach(element => {
                    response.space_images.remove(element);
                });
            }

            if (response && Object.keys(images).length > 0) {
                console.log("i am in");
                let result = Object.keys(images).map((key) => {

                    const extension = images[key].type;
                    const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
                    if (images[key] && (!imageExtArr.includes(extension))) {
                        return callback('imageInvalid');
                    }
                    const imageName = images[key] ? `${moment().unix()}${path.extname(images[key].name)}` : '';
                    if (images[key]) {
                        Helper.ImageUpload(images[key], imageName);
                        params['image'] = imageName;
                        let newImagesUpload = new SpacesImages({ client_space_id: response._id, image_url: imageName });
                        return newImagesUpload.save().then((res) => {

                            return res;
                        }).catch((error) => {
                            return callback(error);
                        })
                    }
                })
                await Promise.all(result).then((res) => {
                    response.space_images = res;
                    const spaceId = response.id;
                    response.findByIdAndUpdate(spaceId, {...response, spaceId }, { new: true }).then((data) => {
                        return callback(null, data);
                    }).catch((error) => {
                        return callback(error);
                    })
                })


            } else {
                console.log("BHai me chla")
                return callback(null, { response: response });
            }
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function deleteClientSpaces(params, callback) {
    try {
        const clientId = params.authId;
        const _id = params.body.client_space_id;
        await ClientSpace.destroy({
            where: {
                id: _id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}

async function addRemoveClientImages(params, images, callback) {
    try {
        const clientId = params.authId;
        let imagesArr = [];
        let obj = {};
        let removeImagesId = params.fields.remove_images ? params.fields.remove_images.split(',') : [];

        if (Object.keys(images).length > 0) {
            if (images['video']) {
                console.log('uploading video');
                const video = images['video'];
                const extension = video.type;
                const videoExtArr = ['video/mp4', 'application/octet-stream', 'video/mov'];
                if (video && (!videoExtArr.includes(extension))) {
                    return callback('videoInvalid');
                }
                const videoName = video ? `${moment().unix()}${ path.extname(video.name) }` : '';
                if (video) {
                    Helper.ImageUpload(video, videoName);
                    obj['virtual_video_url'] = videoName;
                    delete images.video;
                }
            }
            Object.keys(images).map((key) => {
                const extension = images[key].type;
                const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
                if (images[key] && (!imageExtArr.includes(extension))) {
                    return callback('imageInvalid');
                }
                const imageName = images[key] ? `${moment().unix()}${ path.extname(images[key].name) }` : '';
                if (images[key]) {
                    Helper.ImageUpload(images[key], imageName);
                    params['image'] = imageName;
                    let newImagesUpload = new ClientImages({ client_id: clientId, image_url: imageName });
                    return newImagesUpload.save().then((res) => {
                        return res;
                    }).catch((error) => {
                        return callback(error);
                    })
                }
            })
            callback(null, 'Images uploaded sucessfully')
        } else {
            console.log("BHai me chla")
            return callback("Nothing to upload");
        }

    } catch (error) {
        return callback(error);
    }
}
async function getClientImages(params, callback) {
    try {
        const clientId = params.authId;
        await ClientImages.findAll({
                where: {
                    client_id: clientId
                },
            })
            .then((response) => {
                return callback(null, response);
            }).catch((error) => {
                return callback(error);
            });

    } catch (error) {
        return callback(error);
    }
}


async function addMenuFood(params, callback) {
    const clientId = params.authId;
    let reqBody = params.body;
    console.log("params");
    console.log(params);
    const reqObj = {
        menu_food_category_id: Joi.number().required(),
        full_charge: Joi.number().required(),
        half_charge: Joi.number().required(),
        food_description: Joi.string().required(),
        food_name: Joi.string().required(),
    }
    const schema = Joi.object(reqObj)
    const { error } = schema.validate(reqBody)
    if (error) {
        return callback(error);
    }
    reqBody['client_id'] = clientId;
    await MenuFood.create(reqBody)
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}
async function getAllMenuFood(params, callback) {
    const clientId = params.authId;
    await MenuFoodCategory.findAll({
            include: [{
                model: MenuFood,
                where: {
                    client_id: clientId
                },
            }, ]
        })
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });

}
async function getCategoriesMenuFood(params, callback) {
    await MenuFoodCategory.findAll()
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });

}
async function deleteMenuFood(params, callback) {
    try {
        const reqObj = {
            menu_food_id: Joi.string().required(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(params.body);
        if (error) {
            return callback(error);
        }
        await MenuFood.destroy({
            where: {
                id: params.body.menu_food_id
            }
        }).then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        })
    } catch (error) {
        return callback(error);
    }
}
async function updateMenuFood(params, callback) {

}

async function getAllBookings(params, callback) {
    const orderId = params.query.id;
    if (orderId) {
        await Booking.findOne({

                where: {
                    client_id: params.authId,
                    id: orderId
                },
                include: [{
                        model: User,
                        id: {
                            [Op.eq]: ['user_id'],
                        },
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PartyType,
                        id: {
                            [Op.eq]: ['party_type_id'],
                        },
                        attributes: ['id', 'name'],

                    },
                    {
                        model: ClientDJ,
                        id: {
                            [Op.eq]: ['client_dj_id'],
                        },
                    },
                    {
                        model: ClientDecorator,
                        id: {
                            [Op.eq]: ['client_decorator_id'],
                        },
                    },
                    {
                        model: ClientSpace,
                        id: {
                            [Op.eq]: ['space_id'],
                        },
                    },
                ]
            })
            .then((response) => {
                return callback(null, response);
            }).catch((error) => {
                return callback(error);
            });
    } else {

        await Booking.findAll({
                where: {
                    client_id: params.authId
                },
                include: [{
                        model: User,
                        id: {
                            [Op.eq]: ['user_id'],
                        },
                        attributes: ['id', 'name'],
                    },
                    {
                        model: PartyType,
                        id: {
                            [Op.eq]: ['party_type_id'],
                        },
                        attributes: ['id', 'name'],

                    },
                ]
            })
            .then((response) => {
                return callback(null, response);
            }).catch((error) => {
                return callback(error);
            });
    }
}


async function getOrderedFood(params, callback) {
    const clientId = params.authId;
    const orderId = params.params.id;
    await OrderFood.findAll({
            where: {
                order_id: orderId
            },
            include: [{
                model: MenuFood,
                id: {
                    [Op.eq]: ['food_id'],
                },
            }]
        })
        .then((response) => {
            return callback(null, response);
        }).catch((error) => {
            return callback(error);
        });
}


module.exports = {
    register,
    clientEditProfile,
    login,
    getClients,
    clientDetails,
    clientStatus,
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
    editClientSpaces,
    getClientSpaces,
    deleteClientSpaces,
    addClientDecorator,
    editClientDecorator,
    deleteClientDecorator,
    getClientDecoration,
    addClientDJ,
    editClientDJ,
    deleteClientDJ,
    getClientDJ,
    addRemoveClientImages,
    getClientImages,
    addMenuFood,
    getAllMenuFood,
    getCategoriesMenuFood,
    deleteMenuFood,
    updateMenuFood,
    getAllBookings,
    getOrderedFood
}