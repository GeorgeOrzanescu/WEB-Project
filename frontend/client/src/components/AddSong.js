import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./AddSong.css";

function AddSong() {
  return (
    <div>
      <h1>Add Song to favourites</h1>
        <Form className="form-add-song">
            <Form.Group className="mb-3" controlId="formSongArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control size="sm" type="text" placeholder="Artist's name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSongTitle">
                <Form.Label>Song title</Form.Label>
                <Form.Control size="sm" type="text" placeholder="song name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSongYear">
                <Form.Label>Year released</Form.Label>
                <Form.Control size="sm" type="text" placeholder="year released" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add new song
            </Button>
        </Form>
    </div>
  );
}

export default AddSong;
