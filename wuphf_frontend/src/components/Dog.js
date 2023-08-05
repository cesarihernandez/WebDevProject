import React, { useState, useEffect } from 'react';
import DogDataService from '../services/dogs';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import "./Dog.css";

const Dog = props => {
    
    let params = useParams();

    const [dog, setDog] = useState({
        id: null,
        breed: "",
        size: "",
        reviews: []
    });

    useEffect(() => {
        const getDogs = async id => {
            const res = await DogDataService.findById(id)
            console.log(res.data)
            setDog(res.data)

        }
        getDogs(params.id)
    }, [params.id]);

    console.log(dog.poster);

    return ( 
        <div>
            <Container>
                <Row>
                    <Col>
                        <div className="poster">
                            <Image
                                className="bigPicture"
                                /* Remove 100x180 */
                                src={dog.poster}
                                fluid
                                onError={(e) => {
                                    e.currentTarget.onerror = null; // prevents looping
                                    e.currentTarget.src = "/images/dog-placeholder.png";
                                }}
                            />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{dog.dog_breed}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    {dog.plot}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>

                        {dog.reviews.map((review, index) => {
                            console.log('review', review)
                            return (
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0 reviewsText">
                                        <h5>{review.name + " reviewed on"}</h5>
                                        <p className="review">{review.review}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Dog;