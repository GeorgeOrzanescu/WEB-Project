import { CLIENT_SECRET, CLIENT_ID } from "../environment/envVariables.js";
import { getSpotifyData } from "../spotify_service/spotifyService.js";

const getSpotifyToken = async (req, res) => {
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
    },
    body: "grant_type=client_credentials",
  });

  global.ACCESS_TOKEN = await result.json();
  if (global.ACCESS_TOKEN !== undefined) {
    res.status(200).send("Access token for spotify was retrieved succsfully!");
  } else {
    res.status(404).send({
      message: "Access token for spotify was not retrieved succsfully!",
    });
  }
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

export { getSpotifyToken, getSpotifySongs };
