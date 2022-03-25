'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class SpaceImage extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    SpaceImage.init({
        image_url: DataTypes.STRING,
        client_space_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        }
    }, {
        sequelize,
        modelName: 'SpaceImage',
        tableName: 'space_images'
    });
    return SpaceImage;
};