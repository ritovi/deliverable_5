const sequelize = require("../utils/connection");
const {DataTypes} = require("sequelize");

const Actor = sequelize.define("actor", {
    firstName : {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image : {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    birhtdate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

module.exports = Actor;