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

    // Determine if the user is editing an existing review or creating a new one
    let editing = location.currentReview ? true : false;
    let initialReviewState = ""; 

    // If there's an existing review, set the initial review state for editing
    if (location.state && location.state.currentReview)  {
        editing = true;
        initialReviewState = location.state.currentReview.review;
    }

    const [review, setReview] = useState(initialReviewState); 

    // Function to update the review content when changed
    const onChangeReview = e => { 
        const review = e.target.value; 
        setReview(review); 
    } 

    // Function to save the review
    const saveReview = () => {
        var data = { 
        review: review, 
        name: user.name, 
        user_id: user.googleId,
        dog_id: params.id // get dog id from url 
    } 

    if (editing) {
        // TODO: Handle case where an exisiting 
        // review is being updated
        const editData = {
            review_id: location.state.currentReview._id,
            review: review,
            user_id: user.googleId
        }
        DogDataService.updateReview(editData)
        .then(response => {
            navigate("/dogs/"+params.id);
        })

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
                    <Form.Label style={{ color: 'white', fontWeight: 'bold'}}>{ editing ? "Edit" : "Create" } Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        required
                        review={ review }
                        onChange={ onChangeReview }
                        defaultValue={ editing ? initialReviewState : "" }
                    />
                </Form.Group>
                <Button className="link-button" onClick={ saveReview }>
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default AddReview; 