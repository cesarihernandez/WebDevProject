import React, { useState, useEffect } from 'react';
import FavoriteDataService from '../services/favorites';
import DogDataService from '../services/dogs';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { PiStarBold } from "react-icons/pi";

import "./FavoritesPage.css";

const FavoritesPage = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [dogDetails, setDogDetails] = useState([]);

  // get user's favorite dog IDs when the user prop changes
  useEffect(() => {
    const getFavorites = async () => {
      if (user) {
        try {
          const userId = user.googleId;
          const response = await FavoriteDataService.getAll(userId);
          console.log('Full response:', response);
          console.log('geted favorites:', response.data);
          setFavorites(response.data.favorites);
        } catch (error) {
          console.error('Error geting favorites:', error);
        }
      }
    };
    getFavorites();
  }, [user]);

  // Get dog details for the user's favorite dogs
  useEffect(() => {
    const getDogDetails = async () => {
      const dogDetails = await Promise.all(favorites.map(async (dogId) => {
        try {
          const response = await DogDataService.get(dogId);
          return response.data;
        } catch (error) {
          console.error('Error getting dog details:', error);
          return null;
        }
      }));
      // Filter out null values from the dog details
      setDogDetails(dogDetails.filter(dog => dog !== null));
    };
    
    if (favorites.length > 0) {
      getDogDetails();
    }
  }, [favorites]);

  return (
    <div className="favorites-container">
      <h1 className="favHeading"> <PiStarBold/> Favorites Page <PiStarBold/> </h1>
      <div className="dogsList">
        {dogDetails.map((dog) => (
          <Col key={dog._id}>
            <Card className="dogsListCard"> 
              <Card.Img
                className="smallPoster"
                src={dog.poster}
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/images/dog-placeholder.png";
                }}
              />
              <Card.Body className="salmBackground">
                <Card.Title className="cardTitle"> {dog.dog_breed}</Card.Title>
                <Card.Text className="cardTitle">
                  Dog Size: {dog.size}
                </Card.Text>
                <Link to={"/dogs/" + dog._id} className="slategreyBg">
                  View Traits & Reviews
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;