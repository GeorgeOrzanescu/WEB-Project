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
// app.get("/", async (req, res) => {
//     // u can pass an attributes parameter to get only the desired attributes
//     const artists = await Artist.findAll({
//         include: ["songs"]
//     });
//     res.send(artists);
// })



// app.post("/addSong", (req, res) => {
//     const {name,title,year} = req.body;
//     const newSong = Artist.create({name, song :[{
//         title,year
//         }]}); //create contains build and save method
//
//     res.send("Song added successfully")
// })

const port = process.env.PORT || __PORT__
const version = "0.0.1"

// this creates the database if not created already
// !! use force : true when u want to recreate the database with all the tables {force:true}
sequelize.sync({force:true}).then(() => {
    console.log("Database is synced successfully")
}).catch(err => console)

app.listen(port, () => console.dir("Server listening on port " + port))

