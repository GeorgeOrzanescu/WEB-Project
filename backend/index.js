import express, {response} from "express"
import {CLIENT_ID, CLIENT_SECRET, REDIRECT_URI} from "./const.js";
import {getData} from "./spotify_service/service.js";

const app = express();

global.ACCESS_TOKEN;

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
        scope: "user-library-read",
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
        global.ACCESS_TOKEN = data.access_token; // store the access_token in a global variable
        console.dir(global.ACCESS_TOKEN);
        res.redirect("/showuser");  // redirect to home page
    }
)
// get user profile information from spotify.com API endpoint
app.get("/showuser",async (req, res) => {
    const userInformation = await getData("me"); // moved this to a service
    const userInformationData = await userInformation.json();

    const userTracks = await getData("me/tracks"); // requires scopes see documentation https://developer.spotify.com/documentation/general/guides/authorization/scopes/
    const userTrackData = await userTracks.json();
    const tracks = userTrackData.items
    const userFavouriteArtists = []
    tracks.forEach((track) => { // the response object is very complex and hard to get the info u need
        const {artists} = track.track
        artists.forEach((artist) =>userFavouriteArtists.push(artist.name))
    })

    const response = {
        user : userInformationData.display_name,
        userFavouriteArtists : userFavouriteArtists
    }
    res.send(response);
})











const port = process.env.PORT || 3000
const version = "0.0.1"


app.listen(port, () => console.dir("Server listening on port " + port))