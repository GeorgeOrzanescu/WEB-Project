import express from "express";
import adminRouter from "./routers/admin-router/adminRouter.js";
import userRouter from "./routers/user-router/userRouter.js";
import sequelize from "./database/database.js";
import { __PORT__ } from "./environment/envVariables.js";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./middleware/cors.js";
import User from "./models/user.js";
import FavouriteSong from "./models/favouriteSongs.js";

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowCrossDomain);

app.use(adminRouter);
app.use(userRouter);

const port = process.env.PORT || __PORT__;
const version = "0.0.1";

// this creates the database if not created already
// !! use {force:true} when you want to recreate the database with all the tables
User.hasMany(FavouriteSong, { as: "favouriteSongs" });
FavouriteSong.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database is synced successfully");
  })
  .catch((err) => console);

app.listen(port, () => console.dir("Server listening on port " + port));
