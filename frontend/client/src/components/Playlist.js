import UserService from "../services/userService";
import { useEffect, useState } from "react";
import "./Playlist.css";
import { Button, Table } from "react-bootstrap";
import SpotifyService from "../services/spotifyService";
function Playlist(props) {
  const [songs, setSongs] = useState([]);
  const [spotifySongs, setSpotifySongs] = useState([]);
  const [addedSong, setAddedSong] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserService.getUserSongs(props.userId);
      const resultSpotify = await SpotifyService.getSpotifyTrendingSongs();
      setSongs(result);
      setSpotifySongs(resultSpotify);
    };
    fetchData();
  }, [addedSong, props.userId]);

  const removeFavouriteSongHandler = async (songId) => {
    const result = await UserService.removeFavouriteSong(props.userId, songId);
    setSongs(result);
  };

  const addToUserList = async (song) => {
    await UserService.addFavouriteSong(props.userId, song);
    setAddedSong(addedSong + 1);
  };

  return (
    <div>
      <h1>Your favourite songs</h1>
      <Table striped bordered hover id="song-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song, index) => {
            return (
              <tr key={index}>
                <th scope="row">
                  {index + 1}
                  <Button
                    className="remove-song-btn"
                    variant="danger"
                    size="sm"
                    onClick={(event) => {
                      event.preventDefault();
                      removeFavouriteSongHandler(song.id);
                    }}
                  >
                    Remove
                  </Button>
                </th>
                <th>{song.artist}</th>
                <th>{song.title}</th>
                <th>{song.year}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <h1>Trending songs on Spotify</h1>
      <Table striped bordered hover id="spotify-song-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Artist</th>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {spotifySongs.map((spotifySong, index) => {
            return (
              <tr key={index}>
                <th scope="row">
                  {index + 1}
                  <Button
                    className="add-song-btn"
                    variant="success"
                    size="sm"
                    onClick={(event) => {
                      event.preventDefault();
                      addToUserList(spotifySong);
                    }}
                  >
                    Add to your list
                  </Button>
                </th>
                <th>{spotifySong.artist}</th>
                <th>{spotifySong.title}</th>
                <th>{spotifySong.year}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Playlist;
