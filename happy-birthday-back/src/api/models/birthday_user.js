const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const BirthdayMember = sequelize.define('BirthdayMember', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
    }
}, {
    tableName: 'birthday_member',
    timestamps: false,
});

module.exports = BirthdayMember;
