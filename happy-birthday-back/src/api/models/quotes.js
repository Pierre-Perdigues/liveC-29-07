const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Quotes = sequelize.define('Quotes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quote: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'quote',
    timestamps: false,
});

module.exports = Quotes;
