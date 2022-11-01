import sequelize from "../database/database.js";
import {DataTypes} from "sequelize";


const User = sequelize.define("user", {
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;