// const Client = require('../models/client.model');
// const ClientPlaceType = require('../models/client_place_type.model');
// const ClientPartyType = require('../models/client_party_type.model');
// const ClientFoodType = require('../models/client_food_type.model');
// const ClientOtherServicesType = require('../models/client_other_services.model');
// const ClientDaysOpen = require('../models/client_days_open.model');
// const ClientDJ = require('../models/client_dj.model');
// const SpacesImages = require('../models/spaces_images.model');
// const Joi = require('joi');
// const moment = require('moment');
// const path = require('path')

// const Helper = require('../services/helper');
// const auth = require('../middlewares/auth');
// const bcrypt = require("bcryptjs");
// const { param } = require('../routes/client.routes');
// const ClientSpaces = require('../models/client_spaces.model');
// const ClientDecoration = require('../models/client_decoraton.model');
// const ClientImages = require('../models/client_images.model');


// require("dotenv").config();
// async function login({ mobileNumber, password }, callback) {
//     const user = await Client.findOne({ mobileNumber });
//     console.log(user);
//     if (user) {
//         if (bcrypt.compareSync(password, user.password)) {
//             return callback(null, {...user.toJSON() });
//         } else {
//             return callback({
//                 message: "Password is not matched",
//             })
//         }
//     } else {
//         return callback({
//             message: "Invalid Username/Password!",
//         })
//     }
// };

// async function register(params, callback) {
//     try {
//         const owner_phonenumber = params.owner_phonenumber;
//         const client = await Client.findOne({ owner_phonenumber });
//         if (client) {
//             return callback("Client alreeady registered.");
//         } else {
//             console.log("join validation");
//             const reqObj = {
//                 email: Joi.string().email().required(),
//                 password: Joi.string().required(),
//                 place_name: Joi.string().trim().max(50).required(),
//                 owner_name: Joi.string().trim().max(50).required(),
//                 owner_phonenumber: Joi.string()
//                     .trim()
//                     .min(10)
//                     .max(10)
//                     .regex(/^[0-9]*$/)
//                     .required(),
//                 manager_phonenumber: Joi.string()
//                     .trim()
//                     .min(10)
//                     .max(10)
//                     .regex(/^[0-9]*$/)
//                     .required(),
//                 max_capacity: Joi.number().required(),
//                 from_timing: Joi.string().required(),
//                 to_timing: Joi.string().required(),
//             }
//             const schema = Joi.object(reqObj)
//             const { error } = await schema.validate(params)
//             if (error) {
//                 return callback(error);
//             } else {
//                 const passwordHash = await bcrypt.hashSync(params.password, 10);
//                 const clientObj = {
//                     place_name: params.place_name,
//                     owner_name: params.owner_name,
//                     owner_phonenumber: params.owner_phonenumber,
//                     email: params.email,
//                     password: passwordHash,
//                     manager_phonenumber: params.manager_phonenumber,
//                     max_capacity: params.max_capacity,
//                     from_timing: params.from_timing,
//                     to_timing: params.to_timing,
//                     token: auth.generateAccessToken(params.owner_phonenumber),
//                     status: true
//                 }
//                 await Client.create(clientObj)
//                     .then((data) =>
//                         callback(null, data))
//                     .catch((error) =>
//                         callback(null, error))
//             }
//         }
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function clientEditProfile(params, callback) {
//     const _id = params.authId;
//     if (!_id) {
//         return callback("User doesn't exist");
//     }
//     await Client.findByIdAndUpdate(
//         _id, {...params.body, _id }, { new: true }
//     ).then((response) => {
//         return callback(null, response);
//     }).catch((error) => {
//         return callback(error);
//     })
// }

// async function getClients(params, callback) {
//     const clientId = params.query.id;
//     const placeName = params.query.name;
//     if (clientId) {
//         console.log(true);
//         await Client.findOne({ _id: clientId }).populate('images').then((response) => {
//             console.log(response);
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else if (placeName) {
//         await Client.find({
//             place_name: {
//                 $regex: new RegExp(placeName)
//             }

//         }).then((response) => {
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else {
//         await Client.find().then((response) => {
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     }
// }

// async function clientStatus(params, callback) {
//     const reqObj = {
//         status: Joi.bool().required(),
//     }
//     const schema = Joi.object(reqObj)
//     const { error } = schema.validate(params.body);
//     if (error) {
//         return callback(error);
//     }
//     const _id = params.authId;
//     await Client.findByIdAndUpdate(_id, {...params.body, _id }, { new: true }).then((response) => {
//         return callback(null, response)
//     }).catch((error) => {
//         return callback(error)
//     })

// }

// async function addClientTypeOfPlace(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             place_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = await schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             place_id: params.body.place_id
//         }
//         await ClientPlaceType.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientTypeOfPlace(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log(clientId);
//         await ClientPlaceType.find({ _id: clientId }).populate('place_id').then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function removeClientTypeOfPlace(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             place_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             place_id: params.body.place_id
//         }
//         await ClientPlaceType.remove(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientTypeOfParty(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             party_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             party_id: params.body.party_id
//         }
//         console.log(obj);
//         await ClientPartyType.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientTypeOfParty(params, callback) {
//     try {
//         const clientId = params.authId;
//         await ClientPartyType.find({ _id: clientId }).populate('party_id').then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function removeClientTypeOfParty(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             party_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             party_id: params.body.party_id
//         }
//         await ClientPartyType.remove(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addPlaceAddress(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             address: Joi.string().required(),
//             locality: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = await schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         await Client.findByIdAndUpdate(clientId, {...params.body, clientId }, { new: true })
//             .then((response) => {
//                 return callback(null, response);
//             }).catch((error) => {
//                 return callback(error);
//             });
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientTypeOfFood(params, callback) {
//     try {
//         const clientId = params.authId;
//         await ClientFoodType.find({ clientId }).populate('food_id').then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function removeClientTypeOfFood(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             food_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             food_id: params.body.food_id
//         }
//         await ClientFoodType.remove(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientTypeOfFood(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             food_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             food_id: params.body.food_id
//         }
//         console.log(obj);
//         await ClientFoodType.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientTypeOfOtherService(params, callback) {
//     try {
//         const clientId = params.authId;
//         await ClientOtherServicesType.find({ clientId }).populate('service_id').then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function removeClientTypeOfOtherService(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             service_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             service_id: params.body.service_id
//         }
//         await ClientOtherServicesType.remove(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientTypeOfOtherService(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             service_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             service_id: params.body.service_id
//         }
//         console.log(obj);
//         await ClientOtherServicesType.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientDaysOpen(params, callback) {
//     try {
//         const clientId = params.authId;
//         await ClientDaysOpen.find({ clientId }).populate('day_id').then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function removeClientDaysOpen(params, callback) {
//     try {
//         const clientId = params.authId;
//         const reqObj = {
//             day_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             day_id: params.body.day_id
//         }
//         await ClientDaysOpen.remove(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientDaysOpen(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             day_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             day_id: params.body.day_id
//         }
//         console.log(obj);
//         await ClientDaysOpen.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientDJ(params, callback) {
//     const clientId = params.authId;
//     const _id = params.query.id;
//     if (_id) {
//         await ClientDJ.findOne({ _id }).then((response) => {

//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else {
//         await ClientDJ.find({ client_id: clientId }).then((response) => {
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     }
// }

// async function deleteClientDJ(params, callback) {
//     try {
//         const clientId = params.authId;
//         const _id = params.body.dj_id;
//         await ClientDJ.remove({ _id }).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function editClientDJ(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const _id = params.body.dj_id;
//         await ClientDJ.findByIdAndUpdate(_id, {...params.body, _id }, { new: true }).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientDJ(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             dj_name: Joi.string().required(),
//             dj_description: Joi.string().required(),
//             type_of_dj: Joi.string().required(),
//             cost_per_hour: Joi.number().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             dj_name: params.body.dj_name,
//             dj_description: params.body.dj_description,
//             type_of_dj: params.body.type_of_dj_id,
//             cost_per_hour: params.body.cost_per_hour,
//         }
//         await ClientDJ.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function getClientDecoration(params, callback) {
//     const clientId = params.authId;
//     const _id = params.query.id;
//     if (_id) {
//         await ClientDecoration.findOne({ _id }).then((response) => {

//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else {
//         await ClientDecoration.find({ client_id: clientId }).then((response) => {
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     }
// }

// async function deleteClientDecorator(params, callback) {
//     try {
//         const clientId = params.authId;
//         const _id = params.body.decorator_id;
//         await ClientDecoration.remove({ _id }).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function editClientDecorator(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const _id = params.body.decorator_id;
//         await ClientDecoration.findByIdAndUpdate(_id, {...params.body, _id }, { new: true }).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addClientDecorator(params, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             decorator_name: Joi.string().required(),
//             decorator_description: Joi.string().required(),
//             charge: Joi.number().required()
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.body);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             decorator_name: params.body.decorator_name,
//             decorator_description: params.body.decorator_description,
//             charge: params.body.charge
//         }
//         console.log(obj);
//         await ClientDecoration.create(obj).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }
// async function getClientSpaces(params, callback) {
//     const clientId = params.authId;
//     const _id = params.query.id;
//     if (_id) {
//         await ClientSpaces.findOne({ _id }).then((response) => {

//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     } else {
//         await ClientSpaces.find({ client_id: clientId }).then((response) => {
//             return callback(null, response)
//         }).catch((error) => {
//             return callback(error)
//         })
//     }
// }

// async function addClientSpaces(params, images, callback) {
//     try {
//         const clientId = params.authId;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             space_name: Joi.string().required(),
//             space_description: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.fields);
//         if (error) {
//             return callback(error);
//         }
//         const obj = {
//             client_id: clientId,
//             space_name: params.fields.space_name,
//             space_description: params.fields.space_description
//         }
//         console.log(obj);

//         let imagesArr = [];
//         let clientSpaces = new ClientSpaces(obj);
//         await clientSpaces.save().then(async(response) => {
//             if (response && Object.keys(images).length > 0) {
//                 console.log("i am in");

//                 let result = Object.keys(images).map((key) => {

//                     const extension = images[key].type;
//                     const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
//                     if (images[key] && (!imageExtArr.includes(extension))) {
//                         return callback('imageInvalid');
//                     }
//                     const imageName = images[key] ? `${ moment().unix() }${ path.extname(images[key].name) }` : '';
//                     if (images[key]) {
//                         Helper.ImageUpload(images[key], imageName);
//                         params['image'] = imageName;
//                         let newImagesUpload = new SpacesImages({ client_space_id: response._id, image_url: imageName });
//                         return newImagesUpload.save().then((res) => {

//                             return res;
//                         }).catch((error) => {
//                             return callback(error);
//                         })
//                     }
//                 })
//                 await Promise.all(result).then((res) => {
//                     clientSpaces.space_images = res;

//                     clientSpaces.save().then((data) => {
//                         callback(null, data);
//                     });
//                 })


//             } else {
//                 console.log("BHai me chla")
//                 return callback(null, { response: response });
//             }
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function editClientSpaces(params, images, callback) {
//     try {
//         const clientId = params.authId;
//         const spaceId = params.fields.space_id;
//         console.log("clientId mili");
//         console.log(clientId);
//         const reqObj = {
//             space_id: Joi.string().required(),
//         }
//         const schema = Joi.object(reqObj)
//         const { error } = schema.validate(params.fields);
//         if (error) {
//             return callback(error);
//         }

//         let removeImagesId = params.fields.remove_images ? params.fields.remove_images.split(',') : [];


//         let imagesArr = [];
//         await ClientSpaces.findOne({ _id: spaceId }).then(async(response) => {

//             console.log(response);
//             if (removeImagesId.length > 0) {
//                 removeImagesId.forEach(element => {
//                     response.space_images.remove(element);
//                 });
//             }

//             if (response && Object.keys(images).length > 0) {
//                 console.log("i am in");
//                 let result = Object.keys(images).map((key) => {

//                     const extension = images[key].type;
//                     const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
//                     if (images[key] && (!imageExtArr.includes(extension))) {
//                         return callback('imageInvalid');
//                     }
//                     const imageName = images[key] ? `${moment().unix()}${path.extname(images[key].name)}` : '';
//                     if (images[key]) {
//                         Helper.ImageUpload(images[key], imageName);
//                         params['image'] = imageName;
//                         let newImagesUpload = new SpacesImages({ client_space_id: response._id, image_url: imageName });
//                         return newImagesUpload.save().then((res) => {

//                             return res;
//                         }).catch((error) => {
//                             return callback(error);
//                         })
//                     }
//                 })
//                 await Promise.all(result).then((res) => {
//                     response.space_images = res;
//                     const spaceId = response.id;
//                     response.findByIdAndUpdate(spaceId, {...response, spaceId }, { new: true }).then((data) => {
//                         return callback(null, data);
//                     }).catch((error) => {
//                         return callback(error);
//                     })
//                 })


//             } else {
//                 console.log("BHai me chla")
//                 return callback(null, { response: response });
//             }
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function deleteClientSpaces(params, callback) {
//     try {
//         const clientId = params.authId;
//         const _id = params.body.space_id;
//         await ClientSpaces.remove({ _id }).then((response) => {
//             return callback(null, response);
//         }).catch((error) => {
//             return callback(error);
//         })
//     } catch (error) {
//         return callback(error);
//     }
// }

// async function addRemoveClientImages(params, images, callback) {
//     try {
//         const clientId = params.authId;
//         let imagesArr = [];
//         let obj = {};
//         let removeImagesId = params.fields.remove_images ? params.fields.remove_images.split(',') : [];
//         await Client.findOne({ _id: clientId })
//             .then(async(response) => {
//                 console.log
//                 if (removeImagesId.length > 0) {
//                     removeImagesId.forEach(element => {
//                         response.images.remove(element);
//                     });
//                 }
//                 if (response && Object.keys(images).length > 0) {
//                     if (images['video']) {
//                         console.log('uploading video');
//                         const video = images['video'];
//                         const extension = video.type;
//                         const videoExtArr = ['video/mp4', 'application/octet-stream', 'video/mov'];
//                         if (video && (!videoExtArr.includes(extension))) {
//                             return callback('videoInvalid');
//                         }
//                         const videoName = video ? `${moment().unix()}${ path.extname(video.name) }` : '';
//                         if (video) {
//                             Helper.ImageUpload(video, videoName);
//                             obj['virtual_video_url'] = videoName;
//                             delete images.video;
//                         }
//                     }
//                     let result = Object.keys(images).map((key) => {
//                         const extension = images[key].type;
//                         const imageExtArr = ['image/jpg', 'application/octet-stream', 'image/jpeg', 'image/png'];
//                         if (images[key] && (!imageExtArr.includes(extension))) {
//                             return callback('imageInvalid');
//                         }
//                         const imageName = images[key] ? `${moment().unix()}${ path.extname(images[key].name) }` : '';
//                         if (images[key]) {
//                             Helper.ImageUpload(images[key], imageName);
//                             params['image'] = imageName;
//                             let newImagesUpload = new ClientImages({ client_id: response._id, image_url: imageName });
//                             return newImagesUpload.save().then((res) => {
//                                 return res;
//                             }).catch((error) => {
//                                 return callback(error);
//                             })
//                         }
//                     })
//                     await Promise.all(result).then(async(res) => {
//                         obj['images'] = [...response.images, ...res];
//                         await Client.findByIdAndUpdate(clientId, {...obj, clientId }, { new: true }).then((data) => {
//                             return callback(null, data)
//                         }).catch((error) => {
//                             callback(error);
//                         })
//                     })
//                 } else {
//                     console.log("BHai me chla")
//                     return callback(null, response);
//                 }
//             }).catch((error) => {
//                 return callback(error);
//             })
//     } catch (error) {
//         return callback(error);
//     }
// }


// module.exports = {
//     register,
//     login,
//     getClients,
//     clientEditProfile,
//     addPlaceAddress,
//     clientStatus,
//     addClientTypeOfPlace,
//     getClientTypeOfPlace,
//     removeClientTypeOfPlace,
//     addClientTypeOfParty,
//     getClientTypeOfParty,
//     removeClientTypeOfParty,
//     getClientTypeOfFood,
//     addClientTypeOfFood,
//     removeClientTypeOfFood,
//     getClientTypeOfOtherService,
//     addClientTypeOfOtherService,
//     removeClientTypeOfOtherService,
//     getClientDaysOpen,
//     addClientDaysOpen,
//     removeClientDaysOpen,
//     addClientSpaces,
//     editClientSpaces,
//     getClientSpaces,
//     deleteClientSpaces,
//     addClientDecorator,
//     editClientDecorator,
//     deleteClientDecorator,
//     getClientDecoration,
//     addClientDJ,
//     editClientDJ,
//     deleteClientDJ,
//     getClientDJ,
//     addRemoveClientImages,
// }