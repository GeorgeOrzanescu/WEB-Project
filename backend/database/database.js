import {Sequelize,DataTypes} from "sequelize";
//const sequelize = new Sequelize("sqlite::memory:"); // session storage
const sequelize = new Sequelize({ // persistent database
    dialect: 'sqlite',
    storage: './db'
});
const Artist = sequelize.define('Artist', {
    // Model attributes are defined here
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    song: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export {
    sequelize,
    Artist
}