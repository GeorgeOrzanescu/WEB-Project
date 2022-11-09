import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";
import User from "./user";

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

User.hasMany(FavouriteSong, { as: "favouriteSongs" });
FavouriteSong.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});

export default FavouriteSong;
