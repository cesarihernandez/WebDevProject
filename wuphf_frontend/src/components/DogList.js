import React, { useState, useEffect, useCallback } from 'react';
import DogDataService from "../services/dogs";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { PiBoneFill, PiBoneLight } from "react-icons/pi";

import "./DogList.css";

const DogList =({
    user,
    favorites,
    addFavorite,
    deleteFavorite
}) => {
    const [dogs, setDogs] = useState([]);
    const [searchBreed, setSearchBreed] = useState([]);
    const [selectedSize, setSelectedSize] = useState(["All Sizes"]);
    const [sizes, setSizes] = useState(["All Sizes"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] =useState("");

const retrieveSizes = useCallback(() => {
    DogDataService.getSizes()
    .then(response => {
        setSizes(["All Sizes"].concat(response.data))
    })
    .catch(e => {
        console.log(e);
    });
}, []);

const retrieveDogs = useCallback(() => {
    setCurrentSearchMode(""); //Reset our seach box and then go and grab our dogs
    DogDataService.getAll(currentPage) 
    .then(response => {
        setDogs(response.data.dogs);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const find = useCallback((query, by) => {
    DogDataService.find(query, by, currentPage)
    .then(response => {
        setDogs(response.data.dogs);
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const findByBreed = useCallback(() => {
    setCurrentSearchMode("findByBreed");
    find(searchBreed, "dog_breed");
}, [find, searchBreed]);

const findBySize = useCallback(() => {
    setCurrentSearchMode("findBySize");
    const selectedSize = document.getElementById("sizeSelect").value;
    setSelectedSize(selectedSize);
    if (selectedSize === "All Sizes") {
        retrieveDogs();
    } else {
        find(selectedSize, "size");
    }
}, [find, retrieveDogs]);

const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByBreed") {
        findByBreed();
    } else if (currentSearchMode === "findBySize") {
        findBySize();
    } else {
        retrieveDogs();
    }
}, [currentSearchMode, findByBreed, findBySize, retrieveDogs]);

//Use effect to carry out side effect functionality
    useEffect(() => {
        retrieveSizes();
    }, [retrieveSizes]);

    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    //Retrieve the next page if currentPage value changes
    useEffect(() => {
        retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    // Other functions that are not depended on by useEffect
    const onChangeSearchBreed = e => {
        console.log("CHANGING")
        const searchBreed = e.target.value;
        setSearchBreed(searchBreed);
    }

    return (
        <div className="App">
            <Container className="main-container">
                <Form>
                    <Row>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                            type="text"
                            placeholder="Search By Breed"
                            value={searchBreed}
                            onChange={onChangeSearchBreed}
                            />
                        </Form.Group>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={findByBreed}
                        >
                            Search
                        </Button>
                        </Col>
                        <Col>
                        <Form.Group className="mb-3">
                            <Form.Control
                                as="select"
                                id="sizeSelect"
                            >
                                { sizes.map((size, i) => {
                                    return (
                                        <option value={size}
                                        key={i}>
                                            {size}
                                        </option>
                                    )
                                })}
                            </Form.Control>
                        </Form.Group>
                        <Button
                            variant="secondary"
                            type="button"
                            onClick={findBySize}
                        >
                            Search
                        </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="dogRow">
                    { dogs.map((dog) => {
                        return(
                            <Col key={dog._id}>
                                <Card className="dogsListCard">
                                { user &&  (
                                        favorites.includes(dog._id) ?
                                        <PiBoneFill className="bone boneFill" onClick={() => {
                                            deleteFavorite(dog._id);
                                        }}/>
                                        :
                                        <PiBoneLight className="bone boneEmpty" onClick={() => {
                                            addFavorite(dog._id);
                                        }}/>
                                )}  
                                    <Card.Img
                                    className="smallPoster"
                                    src={dog.poster}
                                    onError={(e) => {
                                        e.currentTarget.onerror = null; 
                                        e.currentTarget.src="/images/dog-placeholder.png";
                                         }} />
                                    <Card.Body>
                                        <Card.Title className="cardTitle"> {dog.dog_breed}</Card.Title> 
                                        <Card.Text className="cardTitle">
                                            Dog Size: {dog.size}
                                        </Card.Text>
                                        <Link to={"/dogs/"+dog._id}>
                                            View Breed Traits & Reviews
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
                <br />
                Showing page: {currentPage + 1 }.
                <Button
                variant="link"
                onClick={() => {setCurrentPage(currentPage + 1)} }
                >
                Get next {entriesPerPage} results
                </Button>
            </Container>
        </div>
    )
                }

export default DogList;
