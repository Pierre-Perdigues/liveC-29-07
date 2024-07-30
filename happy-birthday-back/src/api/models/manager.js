const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Manager = sequelize.define('Manager', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
}, {
    tableName: 'manager',
    timestamps: false,
});

module.exports = Manager;
