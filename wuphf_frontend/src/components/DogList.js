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
    const [searchSize, setSearchSize] = useState([""]);
    const [sizes, setSizes] = useState(["All Sizes"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] =useState("");

// Retrieve possible sizes for drop down.
const retrieveSizes = useCallback(() => {
    DogDataService.getSizes()
    .then(response => {
        setSizes(["All Sizes"].concat(response.data))
    })
    .catch(e => {
        console.log(e);
    });
}, []);

// Retrieve list of dogs based on current search mode and page
const retrieveDogs = useCallback(() => {
    setCurrentSearchMode("");
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

// Search dogs by given query and search parameter
const find = useCallback((query, by) => {
    DogDataService.find(query, by, currentPage)
    .then(response => {
        setDogs(response.data.dogs);
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

// Search dogs by breed
const findByBreed = useCallback(() => {
    setCurrentSearchMode("findByBreed");
    find(searchBreed, "dog_breed");
}, [find, searchBreed]);

// Search dogs by size
const findBySize = useCallback(() => {
    setCurrentSearchMode("findBySize");
    if (searchSize === "All Sizes") {
        retrieveDogs();
    } else {
        find(searchSize, "size");
    }
}, [find, searchSize, retrieveDogs]);

// Retrieve next page of dogs based on current search mode
const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByBreed") {
        findByBreed();
    } else if (currentSearchMode === "findBySize") {
        findBySize();
    } else {
        retrieveDogs();
    }
}, [currentSearchMode, findByBreed, findBySize, retrieveDogs]);

    // useEffect to retrieve available sizes when page loads
    useEffect(() => {
        retrieveSizes();
    }, [retrieveSizes]);

    // useEffect to reset current page when search mode changes
    useEffect(() => {
        setCurrentPage(0);
    }, [currentSearchMode]);

    // useEffect to retrieve dogs when current page changes
    useEffect(() => {
            retrieveNextPage();
    }, [currentPage, retrieveNextPage]);

    // Function to update search by breed input value
    const onChangeSearchBreed = e => {
        const searchBreed = e.target.value;
        setSearchBreed(searchBreed);
    }

    // Function to update search by size dropdown value
    const onChangeSearchSize = e => {
        const searchSize = e.target.value; 
        setSearchSize(searchSize);
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
                                onChange={onChangeSearchSize}
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
                                    <Card.Body className="salmonBackground">
                                        <Card.Title className="cardTitle"> {dog.dog_breed}</Card.Title> 
                                        <Card.Text className="cardTitle">
                                            Dog Size: {dog.size}
                                        </Card.Text>
                                        <Link to={"/dogs/"+dog._id} className="slategreyBackground">
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
