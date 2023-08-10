import React, { useState } from 'react'; 
import DogDataService from "../services/dogs";
import { useNavigate, useParams, useLocation } from "react-router-dom"; 
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button'; 
import Container from 'react-bootstrap/Container'; 

const AddReview = ({ user }) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

     let editing = false;
     let initialReviewState = ""; 
    // initialReviewState will have a different value
    if (location.state && location.state.currentReview)  {
        editing = true;
        initialReviewState = location.state.currentReview.review;
    }

    const [review, setReview] = useState(initialReviewState); 

    const onChangeReview = e => { 
        const review = e.target.value; 
        setReview(review); 
    } 
    
    const saveReview = () => {
        var data = { 
        review: review, 
        name: user.name, 
        user_id: user.googleId,
        dog_id: params.id // get dog id from url 
    } 

    if (editing) {
          data.review_id = location.state.currentReview._id
      DogDataService.updateReview(data)
        .then(response => {
            navigate("/dogs/"+params.id);
    })
    .catch(e => {
      console.log(e);   
    });
        } else { 
            DogDataService.createReview(data)
            .then(response => {
                navigate("/dogs/"+params.id)
             })
             .catch(e => {
                console.log(e);
             });
            }
        }
        
        return (
            <Container className="main-container">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>{ editing ? "Edit" : "Create" } Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          type="text"
                          required
                          review={ review }
                          onChange={ onChangeReview }
                          defaultValue={ editing ? location.state.currentReview.review : "" }
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={ saveReview }>
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
    
    export default AddReview; 