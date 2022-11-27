import router from "express";
import { __VERSION__ } from "../../environment/envVariables.js";
import { register, login } from "../../controller/authController.js";

const adminRouter = new router();

/**
 * POST register new user PATH
 */
adminRouter.post("/register", register);

/**
 * POST login user PATH
 */
adminRouter.post("/login", login);

/**
 * GET version of app path
 */
adminRouter.get("/version", (req, res, next) => {
  res.send("Version: " + __VERSION__);
  next();
});

export default adminRouter;
