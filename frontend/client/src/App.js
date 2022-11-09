import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Playlist from "./components/Playlist";
import AddSong from "./components/AddSong";
import Profile from "./components/Profile";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import AuthService from "./services/authService";
import { useState } from "react";
import LoginAndRegisterModal from "./components/LoginAndRegisterModal";
import ButtonAll from "./components/ButtonAll";
import { applicationStore } from "./AppStore/AppStore";
import { observer } from "mobx-react-lite";

function App() {
  // just to demonstrate state usage --> can easily be moved to a store
  const [user, setUser] = useState("");
  const [originModal, setOriginModal] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [password, setPassword] = useState("");

  const onChangeUser = (event) => {
    setUser(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    switch (originModal) {
      case "register": {
        const data = await AuthService.register(user, password);
        if (data) {
          console.log(data);
          applicationStore.setIsLoggedIn(true);
          alert("Registration was successful");
        }
        break;
      }
      case "login": {
        const data = await AuthService.login(user, password);
        if (data) {
          console.log(data);
          applicationStore.setUser(user);
          applicationStore.setIsLoggedIn(true);
          alert("Login was successful");
          window.location.href = "/profile"; // redirect to a new page
        }
        break;
      }
      default:
    }
  };

  const logoutHandler = (event) => {
    event.preventDefault();
    applicationStore.setIsLoggedIn(false);
    applicationStore.setUser("");
    window.location.href = "/";
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Spotify integrated song manager</p>
        <a
          className="App-link"
          href="/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          WEB PROJECT
        </a>
      </header>
      {/* Navigation Bar  */}
      <div>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">HOME</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/profile" disabled={!applicationStore.IsLoggedIn}>
                Profile
              </Nav.Link>
              <Nav.Link
                href="/playlist"
                disabled={!applicationStore.IsLoggedIn}
              >
                Playlist
              </Nav.Link>
              <Nav.Link href="/addsong" disabled={!applicationStore.IsLoggedIn}>
                Add song
              </Nav.Link>
            </Nav>

            {!applicationStore.IsLoggedIn ? (
              <ButtonAll
                className={"login-btn"}
                state={false}
                handler={() => {
                  setOriginModal("login");
                  setModalShow(true);
                }}
                message={"Login"}
              />
            ) : (
              <ButtonAll
                className={"login-btn"}
                state={false}
                handler={logoutHandler}
                message={"Logout"}
              />
            )}
            {!applicationStore.IsLoggedIn ? (
              <ButtonAll
                className={"register-btn"}
                state={false}
                handler={() => {
                  setOriginModal("register");
                  setModalShow(true);
                }}
                message={"Register"}
              />
            ) : (
              <ButtonAll
                className={"register-btn"}
                state={true}
                handler={() => {
                  setOriginModal("register");
                  setModalShow(true);
                }}
                message={"Register"}
              />
            )}

            <LoginAndRegisterModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onSubmit={submitHandler}
              onChangePassword={onChangePassword}
              onChangeUser={onChangeUser}
            />
          </Container>
        </Navbar>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={<Profile store={applicationStore} />}
          />
          <Route path="/playlist" element={<Playlist />} />
          <Route path="/addsong" element={<AddSong />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default observer(App);
