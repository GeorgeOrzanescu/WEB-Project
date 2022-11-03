import router from "express"
import {__VERSION__} from "../../environment/envVariables.js";
import {register,login} from "../../controller/authController.js";

const adminRouter = new router();

adminRouter.post("/register",register);
adminRouter.post("/login", login);
adminRouter.get("/version", (req, res,next) => {
    res.send("Version: " + __VERSION__);
    next();
})

export default adminRouter;