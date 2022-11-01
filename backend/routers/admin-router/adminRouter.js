import router from "express"
import {__VERSION__} from "../../environment/envVariables.js";
import {signup,login} from "../../controller/authController.js";


const adminRouter = new router();

adminRouter.get("/register", (req, res,next) => {

    res.send("This will be the --> create new account API");
    next();
});

adminRouter.post("/login", signup);
// adminRouter.post("/login", (req, res, next) => {
//     res.send("This will be the --> login API");
//     next();
// })

adminRouter.get("/version", (req, res,next) => {
    res.send("Version: " + __VERSION__);
    next();
})


export default adminRouter;