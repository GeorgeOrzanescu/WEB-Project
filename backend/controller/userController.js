import FavouriteSong from "../models/favouriteSongs.js";
import { _getUserById } from "../database/databaseService.js";

const getFavouriteSongs = async (req, res, next) => {
  const userId = req.params["id"];
  console.log(userId);
  try {
    const user = await _getUserById(userId);
    //console.log(user.getFavouriteSongs()); // u get a getter automatically for each field NICE
    //res.send(await user.getFavouriteSongs());
    // JUST SEND DUMMY DATA TO WORK IN FRONTEND
    // res.status(200).send([
    //   {
    //     title: "Gone Baby",
    //     artist: "Bill Murray",
    //     year: "2002",
    //   },
    //   {
    //     title: "Dance Slowly",
    //     artist: "Bill Gates",
    //     year: "2001",
    //   },
    //   {
    //     title: "Find all truth",
    //     artist: "Miki Ra",
    //     year: "2090",
    //   },
    // ]);
    const favouriteSongs = await user.getFavouriteSongs();
    res.status(200).send(favouriteSongs);
  } catch (error) {
    res.status(404).send("Unable to retrieve songs");
  }
  next();
};

const addFavouriteSong = async (req, res, next) => {
  const userId = req.params["id"];
  try {
    const user = await _getUserById(userId);
    const song = await FavouriteSong.create({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year,
    });
    if (user) {
      // adds a song to the linked favouriteSongs table
      // !! there is also setFavouriteSongs but this deletes the previous ones
      await user.createFavouriteSong({
        title: req.body.title,
        artist: req.body.artist,
        year: req.body.year,
      });
      res.status(200).send(song);
    }
  } catch (error) {
    res.status(404).send("Unable to add song");
  }
  next();
};

const removeFavouriteSong = async (req, res, next) => {
  const userId = req.params["id"];
  try {
    const user = await _getUserById(userId);
    if (user) {
      // adds a song to the linked favouriteSongs table
      // !! there is also setFavouriteSongs but this deletes the previous ones

      const songs = await user.getFavouriteSongs();
      const modifiedSongs = songs.filter((song) => {
        // remove the one with the id received
        return song.id.toString() !== req.params["songId"].toString();
      });

      user.setFavouriteSongs(modifiedSongs); // set the modified favourite songs list to the user
      res.status(200).send(modifiedSongs);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Unable to remove song");
  }
  next();
};

export { getFavouriteSongs, addFavouriteSong, removeFavouriteSong };
