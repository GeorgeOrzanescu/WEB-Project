import router from "express";
import {
  getSpotifyToken,
  getSpotifySongs,
} from "../../controller/spotifyController.js";

const spotifyRouter = new router();

/**
 * GET for authorize spotify
 */
spotifyRouter.get("/authorize", getSpotifyToken);

/**
 * GET trending songs from spotify
 */
spotifyRouter.get("/spotify", getSpotifySongs);

export default spotifyRouter;
