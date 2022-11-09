import User from "../models/user.js";
import { _getUserById } from "../database/databaseService.js";

const getFavouriteSongs = async (req, res, next) => {
  const userId = req.params["id"];
  console.log(userId);
  try {
    const user = await _getUserById(userId);
    console.log("Testing", user);
    res.send(user);
  } catch (error) {
    res.status(404).send("Unable to retrieve songs");
  }
  next();
};

export { getFavouriteSongs };
