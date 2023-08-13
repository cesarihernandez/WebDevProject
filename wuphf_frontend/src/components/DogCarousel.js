import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

import "./DogCarousel.css";

const DogCarousel = ({ dogDataArray }) => {
    // Function to generate a random number between min and max (inclusive)
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Randomly select three different indexes from the dog data array
    const randomIndexes = [];
    while (randomIndexes.length < 3) {
        const randomIndex = getRandomNumber(0, dogDataArray.length - 1);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Create an array of three randomly selected dog objects
    const randomDogs = randomIndexes.map(index => dogDataArray[index]);

    return (
        <div className="carousel-container">
            <Carousel>
                {randomDogs.map((randomDog, index) => (
                    <Carousel.Item key={index}>
                        <Link to={"/dogs/" + randomDog._id}>
                            <Image
                                className="carousel-poster"
                                src={randomDog.poster}
                                alt={randomDog.dog_breed}
                            />
                        </Link>
                        <Carousel.Caption>
                            {randomDog.dog_breed}
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default DogCarousel;
