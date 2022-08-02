const Helper = require('../services/helper');
const Joi = require('joi');
const { Op } = require('sequelize');
const Sequelize = require("sequelize");
const Razorpay = require("razorpay");


const { DELETE } = require('./constant');
require("dotenv").config();
const { User, Client, UserLiked, UserReviews, Booking, OrderFood, MenuFoodCategory, MenuFood, ClientPlaceType, PlaceType, ClientPartyType, PartyType, ClientFoodTypes, FoodType, ClientWeekDays, WeekDays, ClientOtherServices, OtherServices, ClientDJ, PrivacyType, ClientDecorator, ClientSpace, SpaceImage, ClientImages, Transaction } = require('../models');


var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.SECRET_KEY,
});
async function getPlaces(params, callback) {
    const authId = params.authId;
    console.log(authId);
    console.log(params.params.id);
    const user = await User.findOne({ _id: authId }, );
    // console.log(user.location);
    if (params.params.id) {
        await Client.findOne({
            where: {
                id: {
                    [Op.eq]: params.params.id,
                },
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
                    model: UserReviews,
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
            return callback(null, { rows: response })
        }).catch((error) => {
            return callback(error)
        })
    }
}

async function getLikedPlaces(params, callback) {
    const authId = params.authId;
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
                required: true
            },
            {
                model: UserReviews,
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
        return callback(null, { rows: response })
    }).catch((error) => {
        return callback(error)
    })
}




async function createBookingOrder(params, callback) {
    const requestParams = params.body;
    const { authId } = params;
    const reqObj = {
        booking_charge: Joi.number().required(),
        client_id: Joi.number().required(),
    };
    console.log("::::::::::::requestParams:::::::::::");
    console.log(requestParams);
    const schema = Joi.object(reqObj);
    const { error } = await schema.validate(requestParams);
    if (error) {
        return callback(error);
    } else {
        var options = {
            currency: "INR",
            receipt: 'rec1',
            amount: requestParams.booking_charge * 100
        }
        await instance.orders.create(options, async function(err, order) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                let orderObj = {
                    order_id: order.id,
                    total_billing_amount: requestParams.booking_charge,
                    client_id: requestParams.client_id,
                    payment_status: 'PENDING',
                    user_id: authId
                };
                console.log(orderObj);
                Transaction.create(orderObj).then((response) => {
                    return callback(null, response);
                }).catch((error) => {
                    return callback(error);
                })
            }
        });
    }
}


async function bookPlace(params, callback) {
    try {
        const body = params.body;
        const reqObj = {
            client_id: Joi.number().required(),
            party_type_id: Joi.number().optional(),
            date_of_party: Joi.date().optional(),
            from_timing_of_party: Joi.string(),
            to_timing_of_party: Joi.string(),
            num_of_people: Joi.number().optional(),
            space_id: Joi.number().optional(),
            client_dj_id: Joi.number().optional(),
            client_decorator_id: Joi.number().optional(),
            booking_charge: Joi.number().optional(),
            order_id: Joi.string().required(),
            txn_id: Joi.number().required(),
            transaction_id: Joi.string().optional(),
            signature_id: Joi.string().optional(),
            payment_status: Joi.string()
                .required()
                .valid(
                    'SUCCESS', 'FAILED', 'PENDING'
                )

        }
        const schema = Joi.object(reqObj);
        console.log(":::::::::body:::::::");
        console.log(body);
        const { error } = schema.validate(body);
        if (error) {
            console.log(":::::::::joi error:::::::");
            console.log(":::::::::joi error:::::::", error);
            return callback(error);
        } else {
            if (body.payment_status === 'FAILED') {
                console.log("body.txn_id");
                console.log(body.txn_id);
                await Transaction.update(body, {
                    where: { id: body.txn_id }
                }).catch((error) => {
                    return callback(error);
                });
                return callback({ message: "Booking Failed" });
            }
            console.log(":::::::::Success:::::::");

            body['user_id'] = params.authId;
            body['status_client'] = 'ACCEPT';
            body['status_user'] = 'REQUEST';
            body['total_charge'] = body.booking_charge;
            body['message'] = "Booking is confirmed";

            await Booking.create(body)
                .then(async(bookingData) => {
                    console.log(":::::::::create:::::::");
                    await Transaction.update(body, {
                            where: { id: body.txn_id }
                        })
                        .then((data) =>
                            callback(null, bookingData))
                        .catch((error) =>
                            callback(error))
                })
                .catch((error) => {
                    console.log("error")
                    console.log(error);
                    callback(error)
                });



        }
    } catch (error) {
        console.log("::::::::::error:::::::::::::");
        console.log(error);
        return callback(error);
    }

}

async function userBooking(params, callback) {
    const userId = params.authId;
    await Booking.findAll({
        where: {
            user_id: userId
        }
    }).then((response) => {
        callback(null, response);
    }).catch((e) => callback(e));

}

async function addRateReview(params, callback) {

    const requestParam = params.body;

    const authUserId = params.authId;

    const reqObj = {
        star: Joi.number().required(),
        client_id: Joi.number().required(),
        comment: Joi.string().optional(),
    };

    const schema = Joi.object(reqObj);
    const { error } = schema.validate(requestParam);
    if (error) {

        return callback(error);
    } else {
        if (requestParam.star && requestParam.star !== "") {
            const rateReviewObj = {
                user_id: authUserId,
                client_id: requestParam.client_id,
                star: requestParam.star,
                comment: requestParam.comment,
            };

            await UserReviews.findOne({
                    where: {
                        user_id: authUserId,
                        client_id: requestParam.client_id,
                    }
                })
                .then(async ratingsFound => {
                    if (ratingsFound) {
                        return callback(null, "Rating is already added");
                    } else {
                        await await UserReviews
                            .create(rateReviewObj)
                            .then(async result => {
                                return callback(null, "Rating Added Successfully")
                            })
                            .catch(e => {
                                console.log(e);
                                return callback("something Went Wrong");
                            });
                    }
                })
                .catch((e) => {
                    console.log(e);
                    return callback("something Went Wrong");
                })
        }
    }


};


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

async function getPlaceMenu(params, callback) {
    const clientId = params.params.id;
    await MenuFoodCategory.findAll({
            include: [{
                model: MenuFood,
                where: {
                    client_id: clientId
                },
            }, ]
        })
        .then((response) => {
            return callback(null, { data: response });
        }).catch((error) => {
            return callback(error);
        });

}

async function orderFood(params, callback) {
    try {
        const body = params.body;
        const reqObj = {
            order_id: Joi.number().optional(),
            food_id: Joi.string().optional(),
            quantity: Joi.string().optional(),
        }
        const schema = Joi.object(reqObj)
        const { error } = schema.validate(body);
        if (error) {
            return callback(error);
        } else {
            let foodIds = params.body.food_id.split(',');
            let quantities = params.body.quantity.split(',');
            foodIds.forEach(async(element, index) => {
                let obj = {
                    order_id: body.order_id,
                    food_id: foodIds[index],
                    quantity: quantities[index],
                }
                await OrderFood.create(obj)
                    .then((data) =>
                        data)
                    .catch((error) =>
                        callback(error))
            });
            callback(null, 'Food Order Successfully')

        }
    } catch (error) {
        return callback(error);
    }


}

async function getOrderFood(params, callback) {
    try {
        const orderId = params.query.order_id;
        let options = {
            where: {
                order_id: orderId,
            },
            include: [{ model: MenuFood }]
        }
        await OrderFood.findAll(options)
            .then((data) =>
                callback(null, { data: data }))
            .catch((error) =>
                callback(error))

    } catch (error) {
        return callback(error);
    }


}





module.exports = {
    getPlaces,
    getLikedPlaces,
    createBookingOrder,
    bookPlace,
    userBooking,
    likeUnlike,
    addRateReview,
    getPlaceMenu,
    orderFood,
    getOrderFood

}