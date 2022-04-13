const Helper = require('../services/helper');
const Joi = require('joi');
const { Op } = require('sequelize');
const { DELETE } = require('./constant');
require("dotenv").config();
const { User, Client, UserLiked, Booking, ClientPlaceType, PlaceType, ClientPartyType, PartyType, ClientFoodTypes, FoodType, ClientWeekDays, WeekDays, ClientOtherServices, OtherServices, ClientDJ, PrivacyType, ClientDecorator, ClientSpace, SpaceImage, ClientImages } = require('../models');

async function getPlaces(params, callback) {
    const authId = params.authId;
    console.log(authId);
    console.log(params.params.id);
    const user = await User.findOne({ _id: authId }, );
    // console.log(user.location);
    if (params.params.id) {
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
                    },
                },
                {
                    model: ClientPartyType,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                    include: {
                        model: PartyType,
                        attributes: ["id", "name"],
                    },
                },
                {
                    model: ClientFoodTypes,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                    include: {
                        model: FoodType,
                        attributes: ["id", "name"],
                    },
                },
                {
                    model: ClientWeekDays,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                    include: {
                        model: WeekDays,
                        attributes: ["id", "name"],
                    },
                },
                {
                    model: ClientOtherServices,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                    include: {
                        model: OtherServices,
                        attributes: ["id", "name"],
                    },
                },
                {
                    model: ClientDJ,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                },
                {
                    model: ClientDecorator,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                },
                {
                    model: UserLiked,
                    where: {
                        user_id: authId
                    },
                    required: false
                },
                {
                    model: ClientSpace,
                    client_id: {
                        [Op.eq]: ['id'],
                    },
                    include: [{
                        model: SpaceImage,
                        client_space_id: {
                            [Op.eq]: ['id'],
                        }
                    }]
                },
            ]
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

async function bookPlace(params, callback) {
    try {
        const body = params.body;
        const reqObj = {
            client_id: Joi.number().required(),
            party_type_id: Joi.number().optional(),
            date_of_party: Joi.date().required(),
            from_timing_of_party: Joi.string(),
            to_timing_of_party: Joi.string(),
            num_of_people: Joi.number().required(),
            space_id: Joi.number().required(),
            client_dj_id: Joi.number().optional(),
            client_decorator_id: Joi.number().optional(),
            booking_charge: Joi.number().optional(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(body)
        if (error) {
            return callback(error);
        } else {
            body['user_id'] = params.authId;
            body['status_client'] = 'PENDING';
            body['status_user'] = 'REQUEST';
            body['total_charge'] = body.booking_charge;
            await Booking.create(body)
                .then((data) =>
                    callback(null, data))
                .catch((error) =>
                    callback(null, error))

        }
    } catch (error) {
        return callback(error);
    }

}

async function likeUnlike(params, callback) {
    console.log(params.body);
    const reqParam = params.body;
    const
        authUserId = params.authId;
    const likeObj = {
        client_id: reqParam.client_id,
        user_id: authUserId,
    }
    const data = await UserLiked.findOne({
        where: {
            client_id: reqParam.client_id,
            user_id: authUserId
        }
    }).then(jobdata => jobdata)

    if (!data) {
        await UserLiked.create(likeObj)
            .then(async(result) => {
                callback(null, 'liked place')
            })
            .catch(async(e) => {
                callback('internal error');
            })
    } else {
        await UserLiked.destroy({ where: { client_id: reqParam.client_id, user_id: authUserId } })
            .then(() => {
                callback(null, 'liked Place Deleted');
            })
            .catch((e) => {
                callback('something went wrong');
            })

    }
};


module.exports = {
    getPlaces,
    bookPlace,
    likeUnlike
}