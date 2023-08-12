import { useState, useEffect, useCallback } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { Navbar, Nav } from "react-bootstrap";

import Login from "./components/Login";
import Logout from "./components/Logout";
import DogList from "./components/DogList";
import Dog from "./components/Dog";
import AddReview from "./components/AddReview";
import FavoriteDataService from "./services/favorites";
import FavoritesPage from './components/FavoritesPage';
import RandomQuote from "./components/RandomQuote";
//import logo from './logo.svg';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [doSaveFaves, setDoSaveFaves] = useState(false);

  const retrieveFavorites = useCallback(() => {
    FavoriteDataService.getAll(user.googleId)
      .then(response => {
        setFavorites(response.data.favorites);
      })
      
      .catch(e => {
        console.log(e);
      });
  }, [user]);

  const saveFavorites = useCallback(() => {
    if (doSaveFaves) {
    var data = {
      _id: user.googleId,
      favorites: favorites
    }
    FavoriteDataService.updateFavoritesList(data)
      .catch(e => {
        console.log(e);
      })
    }
  }, [favorites, user, doSaveFaves]);

  useEffect(() => {
    if (user && doSaveFaves) {
      saveFavorites();
      setDoSaveFaves(false);
    }
  }, [user, favorites, saveFavorites, doSaveFaves]);

  useEffect(() => {
    if (user) {
      retrieveFavorites();
    }
  }, [user, retrieveFavorites]);
 

  const addFavorite = (dogId) => {
    setDoSaveFaves(true);
    setFavorites([...favorites, dogId])
  }

  const deleteFavorite = (dogId) => {
    setDoSaveFaves(true);
    setFavorites(favorites.filter(f => f !== dogId));
  }

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));
      if (loginData) { 
        let loginExp = loginData.exp; 
        let now = Date.now()/1000; 
        if (now < loginExp) { 
          // Not expired
          setUser(loginData);
          } else { 
            // Expired
            localStorage.setItem("login", null);
          } 
        }
      },  []); 

  return (
    <GoogleOAuthProvider clientId={clientId}> 
      <div className="App">
      <Navbar bg="secondary" expand="lg" sticky="bottom" variant="dark">
        <Container className="container-fluid">
          <Navbar.Brand href="/">
            
          <h2 className="largerImage"> <img src="/images/dog_land_2.png" alt="dog paw" className="pawLogo"/> WUPHF </h2>
          
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/dogs">
                Dogs
              </Nav.Link>
              <Nav.Link href="https://www.petfinder.com/" target="_blank" rel="noopener noreferrer">
                Adopt
              </Nav.Link>
              <Nav.Link as={Link} to="/favorites" style={{ display: user ? 'block' : 'none' }}>
                  Favorites
                </Nav.Link>
              </Nav>
            <RandomQuote/>
            </Navbar.Collapse>
            { user ? (
              <Logout setUser={setUser} clientId={clientId}/>
            ) : (
              <Login setUser={setUser}/>
            )}
          </Container>
        </Navbar>

      <Routes> 
        <Route exact path="/" element={
          <DogList 
            user={user}
            addFavorite={ addFavorite }
            deleteFavorite= { deleteFavorite }
            favorites= { favorites }
            />
          }
            
        />
        <Route exact path="/dogs" element={
          <DogList 
            user={user}
            addFavorite={ addFavorite }
            deleteFavorite= { deleteFavorite }
            favorites= { favorites }
          />}
        />
        <Route path="/dogs/:id" element={
          <Dog user={ user } />}
          />
      <Route path="/dogs/:id/review" element={
            <AddReview user={ user } />} 
          />
         {<Route path="/favorites" element={ 
            <FavoritesPage
            user={user} /> }
          />}
        </Routes>
      </div>
      </GoogleOAuthProvider>
    );
  }

  export default App;


