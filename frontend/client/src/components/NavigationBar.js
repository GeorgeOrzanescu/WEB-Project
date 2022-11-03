import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from "react-bootstrap/Button";
import "./NavigationBar.css"


function NavigationBar() {
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <Navbar.Brand href="#home">HOME</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#home">Profile</Nav.Link>
                    <Nav.Link href="#features">Playlist</Nav.Link>
                    <Nav.Link href="#pricing">Add song</Nav.Link>

                </Nav>
                <Button className="login-btn" variant="outline-light">Login</Button>{' '}
            </Container>
        </Navbar>
    );
}

export default NavigationBar;