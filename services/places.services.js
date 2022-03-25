// const Place = require('../models/place.model');
// const Client = require('../models/client.model');
// const Booking = require('../models/user_booking.model');
// const User = require('../models/user.model');
// const Helper = require('../services/helper');
// const Joi = require('joi');

// require("dotenv").config();

// async function getPlaces(params, callback) {
//     const authId = params.authId;
//     console.log(authId);
//     console.log(params.params.id);
//     const user = await User.findOne({ _id: authId }, );
//     // console.log(user.location);
//     if (params.params.id) {
//         await Client.aggregate([{
//                 "$lookup": {
//                     "from": "clientfoodtypes",
//                     "let": { "clientId": "$_id" },
//                     "pipeline": [
//                         { "$match": { "$expr": { "$eq": ["$client_id", "$$clientId"] } } },
//                         {
//                             "$lookup": {
//                                 "from": "foodtypes",
//                                 "let": { "foodId": "$food_id" },
//                                 "pipeline": [
//                                     { "$match": { "$expr": { "$eq": ["$_id", "$$foodId"] } } }
//                                 ],
//                                 "as": "foodType"
//                             }
//                         },
//                         { "$unwind": "$foodType" }
//                     ],
//                     "as": "clientFoodType"
//                 }
//             },
//             { "$unwind": "$clientFoodType" },
//             {
//                 "$lookup": {
//                     "from": "clientimages",
//                     "localField": "images",
//                     "foreignField": "_id",
//                     "as": "clientimages"
//                 }
//             }
//         ]).then((response) => {
//             // response._doc.distance = Helper.CalculateDistance(response.location.coordinates[0],
//             //     user.location.coordinates[0], response.location.coordinates[1], user.location.coordinates[1]);
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else {
//         await Client.find({}, ).populate('images').then((response) => {
//             response.forEach((key) => {
//                 key._doc.distance = Helper.CalculateDistance(key.location.coordinates[0],
//                     user.location.coordinates[0], key.location.coordinates[1], user.location.coordinates[1]);
//             })
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     }
// }

// async function bookPlace(params, callback) {
//     try {
//         const body = params.body;
//         const reqObj = {
//             client_id: Joi.string().required(),
//             date: Joi.date().required(),
//             from_timing: Joi.date().timestamp(),
//             to_timing: Joi.date().timestamp(),
//             no_of_people: Joi.number().required(),
//             ocassion_id: Joi.string().required(),
//             party_space_type_id: Joi.string().optional(),
//             dj_id: Joi.string().optional(),
//             decorator_id: Joi.string().optional(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = await schema.validate(params.body)
//         if (error) {
//             return callback(error);
//         } else {
//             const bookingObj = {
//                 user_id: params.authId,
//                 client_id: body.client_id,
//                 date: body.date,
//                 from_timing: body.from_timing,
//                 to_timing: body.to_timing,
//                 no_of_people: body.no_of_people,
//                 ocassion_id: body.ocassion_id,
//                 party_space_type_id: body.party_space_type_id,
//                 dj_id: body.dj_id,
//                 decorator_id: body.decorator_id,
//             }
//             await Booking.create(bookingObj)
//                 .then((data) =>
//                     callback(null, data))
//                 .catch((error) =>
//                     callback(null, error))

//         }
//     } catch (error) {
//         return callback(error);
//     }

// }



// module.exports = {
//     getPlaces,
//     bookPlace
// }