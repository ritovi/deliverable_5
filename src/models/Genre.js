const sequelize = require("../utils/connection")
const {DataTypes} =  require("sequelize");

const Genre = sequelize.define("genre", {
    name : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Genre;