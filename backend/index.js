import express from "express"
import {sequelize,Artist} from "./database/database.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    // u can pass an attributes parameter to get only the desired attributes
    const artists = await Artist.findAll({
        include: ["songs"]
    });
    res.send(artists);
})

app.get("/version", (req, res) => {
    res.send("Version: " + version);
})

app.post("/addSong", (req, res) => {
    const {name,title,year} = req.body;
    const newSong = Artist.create({name, song :[{
        title,year
        }]}); //create contains build and save method

    res.send("Song added successfully")
})

const port = process.env.PORT || 3000
const version = "0.0.1"

// this creates the database if not created already
// !! use force : true when u want to recreate the database with all the tables {force:true}
sequelize.sync().then(() => {
    console.log("Database is synced successfully")
}).catch(err => console)

app.listen(port, () => console.dir("Server listening on port " + port))

