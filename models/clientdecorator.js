'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClientDecorator extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    ClientDecorator.init({
        client_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Client',
                key: 'id',
            },
        },
        charge: DataTypes.INTEGER,
        decorator_name: DataTypes.STRING,
        decorator_description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'ClientDecorator',
        tableName: 'client_decorators'
    });
    return ClientDecorator;
};