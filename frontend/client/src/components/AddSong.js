import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import "./AddSong.css";
import {createRef} from "react";
import {applicationStore} from "../AppStore/AppStore";
import userService from "../services/userService";

function AddSong() {

    const artistRef = new createRef();
    const titleRef = new createRef();
    const yearRef = new createRef();

    const clearInputs = () => {
        titleRef.current.value ="";
        artistRef.current.value = "";
        yearRef.current.value = null;
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const userId = applicationStore.UserId;
        const songData = {
            title: titleRef.current.value,
            artist: artistRef.current.value,
            year: yearRef.current.value
        }
        await userService.addFavouriteSong(userId,songData);
        clearInputs();
    }

  return (
    <div>
      <h1>Add Song to favourites</h1>
        <Form className="form-add-song" onSubmit={onSubmitForm}>
            <Form.Group className="mb-3" controlId="formSongArtist">
                <Form.Label>Artist</Form.Label>
                <Form.Control ref={artistRef} size="sm" type="text" placeholder="Artist's name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSongTitle">
                <Form.Label>Song title</Form.Label>
                <Form.Control ref={titleRef} size="sm" type="text" placeholder="song name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSongYear">
                <Form.Label>Year released</Form.Label>
                <Form.Control ref={yearRef} size="sm" type="number" placeholder="year released" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add new song
            </Button>
        </Form>
    </div>
  );
}

export default AddSong;
