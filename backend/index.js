import express from "express"

const app = express();

app.get("/", (req,res) => {
    res.send("Home page");
})

app.get("/version", (req,res) => {
    res.send("Version: " + version);
})

const port = process.env.PORT || 3000
const version = "0.0.1"


app.listen(port, () => console.dir("Server listening on port " + port))