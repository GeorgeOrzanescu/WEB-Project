import UserService from "../services/userService";
import { useEffect, useState } from "react";
import "./Playlist.css";
import { Button, Table } from "react-bootstrap";
function Playlist(props) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserService.getUserSongs(props.userId);
      setSongs(result);
    };

    fetchData();
  }, [props.userId]);

  const removeFavouriteSongHandler = async (songId) => {
    const result = await UserService.removeFavouriteSong(props.userId, songId);
    setSongs(result);
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
                      console.log(song.id);
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
    </div>
  );
}

export default Playlist;
