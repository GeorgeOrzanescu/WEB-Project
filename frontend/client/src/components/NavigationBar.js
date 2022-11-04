import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import "./NavigationBar.css"
import AuthService from "../services/authService";
import {useState} from "react";
import MyVerticallyCenteredModal from "../components/LogRegisterModal";

function NavigationBar() {
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const onChangeUser = (event) => {
        console.log(event.target.value);
        setUser(event.target.value);
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value);
        console.log(password);
    }

    const registerHandler = async (e) => {
        e.preventDefault();
        const data = await AuthService.register("Geo", "test");
        setLoggedIn(false);
    }

    const loginHandler = async (e) => {
        e.preventDefault();
        const data = await AuthService.login("Geo", "test");
        setLoggedIn(true);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        console.log(user + password)
    }

    const createLoginButton = (state,handler) => {
        return (<Button className="login-btn" variant="outline-light" onClick={handler}>{state}</Button>);
    }

    const createRegisterButton = (state,handler) => {
        return (<Button className="register-btn" variant="outline-light" hidden={state} onClick={handler}>Register</Button>);
    }

    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">HOME</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#">Profile</Nav.Link>
                    <Nav.Link href="#">Playlist</Nav.Link>
                    <Nav.Link href="#">Add song</Nav.Link>
                </Nav>
                {!isLoggedIn ? createLoginButton("Login",() => setModalShow(true)) : createLoginButton("Logout",()=>{})}
                {!isLoggedIn ? createRegisterButton(false,() => setModalShow(true)) : createRegisterButton(true,()=>{})}
                <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onSubmit={submitHandler}
                    onChangePassword ={onChangePassword}
                    onChangeUser ={onChangeUser}
                />
            </Container>
        </Navbar>
    );
}

export default NavigationBar;