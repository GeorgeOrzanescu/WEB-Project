import router from "express";
import { getFavouriteSongs } from "../../controller/userController.js";

const userRouter = new router();
userRouter.get("/songs/:id", getFavouriteSongs);

export default userRouter;
