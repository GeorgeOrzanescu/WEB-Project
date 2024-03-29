import FavouriteSong from "../models/favouriteSongs.js";
import { _getUserById } from "../database/databaseService.js";

/**
 * Handles the GET favourite songs
 * @param {Request} req
 * @param {Response} res
 *
 * @returns favourite songs of the user or 404
 */
const getFavouriteSongs = async (req, res) => {
  const userId = req.params["id"];
  try {
    const user = await _getUserById(userId);
    const favouriteSongs = await user.getFavouriteSongs();
    res.status(200).send(favouriteSongs);
  } catch (error) {
    res.status(404).send("Unable to retrieve songs");
  }
};

/**
 * Handles the POST favourite songs
 * @param {Request} req
 * @param {Response} res
 *
 * @returns song added or 404
 */
const addFavouriteSong = async (req, res) => {
  const userId = req.params["id"];
  try {
    const user = await _getUserById(userId);
    const song = await FavouriteSong.create({
      title: req.body.title,
      artist: req.body.artist,
      year: req.body.year,
    });
    if (user && song) {
      // adds a song to the linked favouriteSongs table
      // !! there is also setFavouriteSongs but this deletes the previous ones
      await user.addFavouriteSong(song);
      res.status(200).send(song);
    }
  } catch (error) {
    res.status(404).send("Unable to add song");
  }
};

/**
 * Handles the DELETE favourite song
 * @param {Request} req
 * @param {Response} res
 *
 * @returns songs of the user or 404
 */
const removeFavouriteSong = async (req, res) => {
  const userId = req.params["id"];
  try {
    const user = await _getUserById(userId);
    if (user) {
      const songs = await user.getFavouriteSongs();
      const modifiedSongs = songs.filter((song) => {
        // remove the one with the id received
        return song.id.toString() !== req.params["songId"].toString();
      });
      user.setFavouriteSongs(modifiedSongs); // set the modified favourite songs list to the user
      res.status(200).send(modifiedSongs);
    }
  } catch (error) {
    res.status(404).send("Unable to remove song");
  }
};

export { getFavouriteSongs, addFavouriteSong, removeFavouriteSong };
