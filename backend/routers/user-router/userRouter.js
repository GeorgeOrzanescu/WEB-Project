import router from "express";
import {
  getFavouriteSongs,
  addFavouriteSong,
  removeFavouriteSong,
} from "../../controller/userController.js";

const userRouter = new router();

/**
 * GET favourite songs PATH
 * @pathParam - user id
 */
userRouter.get("/songs/:id", getFavouriteSongs);

/**
 * POST favourite song PATH
 * @pathParam - user id
 */
userRouter.post("/songs/:id/add", addFavouriteSong);

/**
 * DELETE favourite song PATH
 * @pathParam - user id
 * @pathParam - song id
 */
userRouter.delete("/songs/:id/remove/:songId", removeFavouriteSong);

export default userRouter;
