import React, { useState, useEffect } from 'react';
import DogDataService from '../services/dogs';
import {Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/esm/Card';
import Container from 'react-bootstrap/esm/Container';
import Image from 'react-bootstrap/esm/Image';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

import "./Dog.css";

const Dog = ({user}) => {
    
    let params = useParams();

    const [dog, setDog] = useState({
        id: null,
        breed: "",
        size: "",
        reviews: []
    });

    useEffect(() => {
        const getDog = id => {
          DogDataService.get(id)
            .then(response => {
              setDog(response.data);
            })
            .catch(e => {
              console.log(e);
            });
        }
        getDog(params.id)
      }, [params.id]);
      
      const deleteReview = (reviewId, index) => {
        let data = {
          review_id: reviewId,
          user_id: user.googleId
        }
        DogDataService.deleteReview(data)
          .then(response => {
            setDog((prevState) => {
              prevState.reviews.splice(index, 1);
              return ({
                ...prevState
              })
            })
          })
          .catch(e => {
            console.log(e);
          });
      }
      

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
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src = "/images/dog-placeholder.png";
                                }}
                        fluid    />
                        </div>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as="h5">{dog.dog_breed}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    Size: {dog.size}
                                </Card.Text>
                                <Card.Text>
                                    Shedding: {dog.shedding}
                                </Card.Text>
                                <Card.Text>
                                    Grooming: {dog.grooming}
                                </Card.Text>
                                <Card.Text>
                                    Intelligence: {dog.intelligence}
                                </Card.Text>
                                <Card.Text>
                                    Activity Level: {dog.activity_level}
                                </Card.Text>
                                <Card.Text>
                                    Barking: {dog.barking}
                                </Card.Text>
                                <Card.Text>
                                    Training: {dog.training}
                                </Card.Text>
                                <Card.Text>
                                  Good For Beginner: {dog.good_for_beginner ? "Yes" : "No"}
                                </Card.Text>
                                <Card.Text>
                                  Good With Kids: {dog.good_with_kids ? "Yes" : "No"}
                                </Card.Text>
                                <Card.Text>
                                  Good With Other Dogs: {dog.good_with_dogs ? "Yes" : "No"}
                                </Card.Text>

                                { user && 
                                    <Link to={"/dogs/"+params.id+"/review"}>
                                        Add Review
                                    </Link>}
                            </Card.Body>
                        </Card>
                        <h2>Reviews</h2>
                        <br></br>
                        { dog.reviews.map((review, index) => { 
                        return ( 
                           <div className="d—flex" key={index}>
                             <div className="flex—shrink-0 reviewsText">
                                <h5>{review.name + " reviewed on "} { moment(review.date).format("Do MMMM YYYY") }</h5>
                                 <p className="review">{review.review}</p>
                                 { user && user.googleId === review.user_id &&
                                 <Row>
                                    <Col>
                                      <Link to={{
                                        pathname: "/dogs/"+params.id+"/review/"
                                        }}
                                        state = {{
                                            currentReview: review
                                        }} >
                                        Edit
                                        </Link>
                                    </Col>
                                    <Col>
                                      <Button variant="link" onClick={() => {
                                        deleteReview(review._id, index)
                                       }}>
                                        Delete 
                                        </Button>
                                      </Col>
                                    </Row>
                                  }
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
