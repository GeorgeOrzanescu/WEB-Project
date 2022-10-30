import express from "express"
import {sequelize,Artist} from "./database/database.js";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
    // u can pass an attributes parameter to get only the desired attributes
    const songs = await Artist.findAll({
        attributes: ['name','song']
    });
    res.send(songs);
})

app.get("/version", (req, res) => {
    res.send("Version: " + version);
})

app.post("/addSong", (req, res) => {
    const {name,song} = req.body
    const newSong = Artist.create({name, song}); //create contains build and save method
    console.log(name, song);
    res.send("Song added successfully")
})

const port = process.env.PORT || 3000
const version = "0.0.1"

// this creates the database if not created already
sequelize.sync().then(() => {
    console.log("Database is synced successfully")
}).catch(err => console)

app.listen(port, () => console.dir("Server listening on port " + port))

