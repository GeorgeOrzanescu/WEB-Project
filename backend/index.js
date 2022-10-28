import express from "express"
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from "./const.js";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.html");
})
app.get("/version", (req, res) => {
    res.send("Version: " + version);
})

// get the authorization code from spotify.com
app.get("/authorize", (req, res) => {
    const queryParams = new URLSearchParams({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: "",
        // this redirect address set in the developers panel at https://developer.spotify.com/dashboard/
        redirect_uri: REDIRECT_URI,
    });
    res.redirect("https://accounts.spotify.com/authorize?" + queryParams.toString())
})

// implementation of the callback required by spotify
app.get("/callback", async (req, res) => {
        const code = req.query.code

        // these are basically subsequent requests documentation here https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
        const body = new URLSearchParams({
            code: code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        })

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                // this needs to be in base64
                "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
            }
        })

        const data = await response.json();
        console.dir(data);
    }
)


const port = process.env.PORT || 3000
const version = "0.0.1"


app.listen(port, () => console.dir("Server listening on port " + port))