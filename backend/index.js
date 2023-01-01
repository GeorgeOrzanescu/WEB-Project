import express from "express";
import adminRouter from "./routers/admin-router/adminRouter.js";
import userRouter from "./routers/user-router/userRouter.js";
import spotifyRouter from "./routers/spotify-router/spotifyRouter.js";
import sequelize from "./database/database.js";
import { __PORT__ } from "./environment/envVariables.js";
import cookieParser from "cookie-parser";
import { allowCrossDomain } from "./middleware/cors.js";
import User from "./models/user.js";
import FavouriteSong from "./models/favouriteSongs.js";

const app = express();

global.ACCESS_TOKEN;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(allowCrossDomain);

//routers
app.use(adminRouter);
app.use(userRouter);
app.use(spotifyRouter);

const port = process.env.PORT || __PORT__;

/**
 * Create the relationships between models
 */
User.hasMany(FavouriteSong, { as: "favouriteSongs" });
FavouriteSong.belongsTo(User, {
  foreignKey: "userId",
  constraints: true,
  onDelete: "CASCADE",
});

// this creates the database if not created already
// !! use {force:true} when you want to recreate the database with all the tables
sequelize
  .sync()
  .then(() => {
    console.log("Database is synced successfully");
  })
  .catch((err) => console);

app.listen(port, () => console.dir("Server listening on port " + port));
