'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class city extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            city.hasOne(models.State, {
                sourceKey: 'state_id',
                foreignKey: 'id',
            })
            city.hasMany(models.Client, {
                sourceKey: 'id',
                foreignKey: 'city_id',
            })
        }
    };
    city.init({
        name: DataTypes.STRING,
        state_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'State',
                key: 'id',
            }
        },
        description: DataTypes.STRING,
        status: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'City',
        tableName: 'cities',
        indexes: [{
            unique: false,
            fields: ['state_id', 'status'],
        }, ],
    });
    return city;
};