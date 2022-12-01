import UserService from "../services/userService";
import { useEffect, useState } from "react";
import "./Playlist.css";
import {Table} from "react-bootstrap";
function Playlist(props) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await UserService.getUserSongs(props.userId);
      setSongs(result);
      console.log(songs);
    };

    fetchData();
  }, [props.userId]);

  return (
    <div>
      <h1>Your favourite songs</h1>
      <Table striped bordered hover>
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
                <th scope="row">{index + 1}</th>
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
