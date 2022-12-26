import router from "express";
import {
  authorize,
  callback,
  getSpotifySongs,
} from "../../controller/spotifyController.js";

const spotifyRouter = new router();

/**
 * GET for authorize spotify
 */
spotifyRouter.get("/authorize", authorize);

/**
 * GET callback for authorization of spotify
 */
spotifyRouter.get("/callback", callback);

/**
 * GET trending songs from spotify
 */
spotifyRouter.get("/spotify", getSpotifySongs);

export default spotifyRouter;
