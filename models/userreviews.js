 'use strict';
 const {
     Model
 } = require('sequelize');
 module.exports = (sequelize, DataTypes) => {
     class UserReviews extends Model {
         /**
          * Helper method for defining associations.
          * This method is not a part of Sequelize lifecycle.
          * The `models/index` file will call this method automatically.
          */
         static associate(models) {

             UserReviews.hasOne(models.User, {
                 foreignKey: 'id',
                 sourceKey: 'user_id'
             })

             UserReviews.hasOne(models.Client, {
                 foreignKey: 'id',
                 sourceKey: 'client_id'
             })
         }
     }
     UserReviews.init({
         user_id: {
             type: DataTypes.INTEGER,
             allowNull: false,
         },
         client_id: {
             type: DataTypes.INTEGER,
             allowNull: false
         },
         star: {
             type: DataTypes.INTEGER,
             allowNull: false
         },
         comment: DataTypes.TEXT
     }, {
         sequelize,
         tableName: 'user_reviews',
         modelName: 'UserReviews',
     });
     return UserReviews;
 };