import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

/**
 * Model for favourite song
 */
const FavouriteSong = sequelize.define("FavouriteSong", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  artist: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
  },
});

export default FavouriteSong;
