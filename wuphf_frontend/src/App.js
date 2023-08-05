import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { Navbar, Nav } from "react-bootstrap";
import DogList from "./components/DogList";
import Dog from "./components/Dog";
//import logo from './logo.svg';
import './App.css';

function App() {

  return (
      <div className="App">
      <Navbar bg="primary" expand="lg" sticky="top" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand href="/">
            <img src="/images/dog-paw.png" alt="dog paw" className="pawLogo"/>
          WUPHF
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/dogs">
                Dogs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes> 
        <Route exact path="/" element={
          <DogList />}
        />
        <Route exact path="/dogs" element={
          <DogList />}
        />
        <Route path="/dogs/:id" element={
          <Dog />}
        />
      </Routes>
    </div>
  );
}

export default App;

