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
    }
});

const Song = sequelize.define('Song', {
    // Model attributes are defined here
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


Artist.hasMany(Song,{as:"songs"});
Song.belongsTo(Artist,{foreignKey:"userId",constraints:true,onDelete:"CASCADE"})


export {
    sequelize,
    Artist,
    Song
}