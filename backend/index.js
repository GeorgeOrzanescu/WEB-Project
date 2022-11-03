import express from "express"
import adminRouter from "./routers/admin-router/adminRouter.js"
import sequelize from "./database/database.js";
import {__PORT__} from "./environment/envVariables.js";
import cookieParser from "cookie-parser";

const app = express();

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(adminRouter);


const port = process.env.PORT || __PORT__;
const version = "0.0.1";

// this creates the database if not created already
// !! use {force:true} when you want to recreate the database with all the tables
sequelize.sync({force:true}).then(() => {
    console.log("Database is synced successfully")
}).catch(err => console)

app.listen(port, () => console.dir("Server listening on port " + port))

