import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./components/Home";
import Playlist from "./components/Playlist";
import AddSong from "./components/AddSong";
import Profile from "./components/Profile";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthService from "./services/authService";
import {useState} from "react";
import LoginAndRegisterModal from "./components/LoginAndRegisterModal";
import ButtonAll from "./components/ButtonAll";
import AppContext from "./context/AppContext";

function App() {
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [originModal,setOriginModal] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUser = (event) => {
        setUser(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        switch (originModal) {
            case "register": {
                const data = await AuthService.register(user, password);
                if (data) {
                    console.log(data);
                    setLoggedIn(true);
                    alert("Registration was successful")
                }
                break;
            }
            case "login": {
                const data = await AuthService.login(user,password);
                if (data) {
                    console.log(data);
                    setLoggedIn(true);
                    alert("Login was successful")
                }
                break;
            }
        }
    }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Spotify integrated song manager
        </p>
        <a
          className="App-link"
          href="/#"
          target="_blank"
          rel="noopener noreferrer"
        >
          WEB PROJECT
        </a>
      </header>
        <AppContext.Provider value={{
            user:user
        }}>
        <BrowserRouter>
            <div>
                <Navbar bg="primary" variant="dark">
                    <Container>
                        <Navbar.Brand href="/">HOME</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="/profile">Profile</Nav.Link>
                            <Nav.Link href="/playlist">Playlist</Nav.Link>
                            <Nav.Link href="/addsong">Add song</Nav.Link>
                        </Nav>

                        {!isLoggedIn ?
                            <ButtonAll
                                className={"login-btn"}
                                state={false}
                                handler={() => {
                                    setOriginModal("login");
                                    setModalShow(true);
                                }}
                                message={"Login"}/> :
                            <ButtonAll
                                className={"login-btn"}
                                state={false}
                                handler={() => {
                                    setLoggedIn(false);
                                }}
                                message={"Logout"}/>
                        }
                        {!isLoggedIn ?
                            <ButtonAll
                                className={"register-btn"}
                                state={false}
                                handler={() => {
                                    setOriginModal("register");
                                    setModalShow(true);
                                }}
                                message={"Register"}/> :
                            <ButtonAll
                                className={"register-btn"}
                                state={true}
                                handler={() => {
                                    setOriginModal("register");
                                    setModalShow(true);
                                }}
                                message={"Register"}/>
                        }

                        <LoginAndRegisterModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            onSubmit={submitHandler}
                            onChangePassword ={onChangePassword}
                            onChangeUser ={onChangeUser}
                        />
                    </Container>
                </Navbar>
            </div>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/profile" element={<Profile/>} />
                <Route path="/playlist" element={<Playlist/>} />
                <Route path="/addsong" element={<AddSong/>} />
            </Routes>
        </BrowserRouter>
        </AppContext.Provider>

    </div>
  );
}

export default App;
