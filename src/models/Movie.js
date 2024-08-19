const sequelize = require("../utils/connection");
const {DataTypes} = require("sequelize");

const Movie = sequelize.define("movie", {
    name : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull:false,
    },
    synopsis : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    releaseYear: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
});

module.exports = Movie;