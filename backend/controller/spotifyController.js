import {
  CLIENT_SECRET,
  CLIENT_ID,
  REDIRECT_URI,
} from "../environment/envVariables.js";
import { getSpotifyData } from "../spotify_service/spotifyService.js";

// get the authorization code from spotify.com
const authorize = (req, res) => {
  const queryParams = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: "user-library-read",
    // this redirect address set in the developers panel at https://developer.spotify.com/dashboard/
    redirect_uri: REDIRECT_URI,
  });
  res.redirect(
    "https://accounts.spotify.com/authorize?" + queryParams.toString()
  );
};

// implementation of the callback required by spotify
const callback = async (req, res) => {
  const code = req.query.code;

  // these are basically subsequent requests documentation here https://developer.spotify.com/documentation/general/guides/authorization/code-flow/
  const body = new URLSearchParams({
    code: code,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // this needs to be in base64
      Authorization:
        "Basic " +
        Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
    },
  });

  const data = await response.json();
  global.ACCESS_TOKEN = data.access_token; // store the access_token in a global variable
  console.dir(global.ACCESS_TOKEN);
  res.status(200).send("Authorization of spotify succeded");
};

const getSpotifySongs = async (req, res) => {
  const response = await getSpotifyData("browse/featured-playlists");
  const data = await response.json();
  const finalSongs = [];

  if (global.ACCESS_TOKEN !== undefined) {
    const playlists = data.playlists.items.slice(0, 1);
    playlists.forEach(async (playlist) => {
      const songResponse = await getSpotifyData(
        `playlists/${playlist.id}/tracks`
      );
      const songs = await songResponse.json();
      songs.items.forEach((song) => {
        let artist = "";
        song.track.artists.map((iartist) => {
          artist += " " + iartist.name;
        });
        finalSongs.push({
          artist: artist,
          title: song.track.name,
          year: song.track.album.release_date.split("-")[0],
        });
      });
      res.status(200).send(finalSongs);
    });
  } else {
    res.status(404).send({
      message: "Access token for spotify was not retrieved succsfully!",
    });
  }
};

export { authorize, callback, getSpotifySongs };
