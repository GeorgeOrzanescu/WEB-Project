import User from "../models/user.js";
import { _getUserById } from "../database/databaseService.js";

const getFavouriteSongs = async (req, res, next) => {
  const userId = req.params["id"];
  console.log(userId);
  try {
    const user = await _getUserById(userId);
    //console.log(user.getFavouriteSongs()); // u get a getter automatically for each field NICE
    //res.send(await user.getFavouriteSongs());
    // JUST SEND DUMMY DATA TO WORK IN FRONTEND
    res.send([
      {
        title: "Gone Baby",
        artist: "Bill Murray",
        year: "2002",
      },
      {
        title: "Dance Slowly",
        artist: "Bill Gates",
        year: "2001",
      },
      {
        title: "Find all truth",
        artist: "Miki Ra",
        year: "2090",
      },
    ]);
  } catch (error) {
    res.status(404).send("Unable to retrieve songs");
  }
  next();
};

export { getFavouriteSongs };
