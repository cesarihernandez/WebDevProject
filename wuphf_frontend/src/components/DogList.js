import React, { useState, useEffect, useCallback } from 'react';
import DogDataService from "../services/dogs";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/esm/Card';
import "./DogList.css";

const DogList = props => {
    // useState to set state values
    // State allows use to update UI
    const [dogs, setDogs] = useState([]);
    const [searchBreed, setSearchBreed] = useState([]);
    const [searchSize, setSearchSize] = useState([]);
    const [size, setSize] = useState(["All Sizes"]);
    const [currentPage, setCurrentPage] = useState(0);
    const [entriesPerPage, setEntriesPerPage] = useState(0);
    const [currentSearchMode, setCurrentSearchMode] =useState("");

const retrieveSizes = useCallback(() => {
    DogDataService.getSizes()
    .then(response => {
        setSize(["All Sizes"].concat(response.data))
    })
    .catch(e => {
        console.log(e);
    });
}, []);

const retrieveDogs = useCallback(() => {
    setCurrentSearchMode(""); //Reset our seach box and then go and grab our movies
    DogDataService.getAll(currentPage) //talks to our backend utilizing MovieDataService file
    .then(response => {
        setDogs(response.data.dogs);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page); //the response is everything the client
        //asked for which in the above case is a movie, currentpage, and the number of movies per page
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const find = useCallback((query, by) => {
    DogDataService.find(query, by, currentPage)
    .then(response => {
        setDogs(response.data.movies);
    })
    .catch(e => {
        console.log(e);
    });
}, [currentPage]);

const findByBreed = useCallback(() => {
    setCurrentSearchMode("findByBreed");
    find(searchBreed, "breed");
}, [find, searchBreed]);

const findBySizes = useCallback(() => {
    setCurrentSearchMode("findBySize");
    if (searchSize === "All Sizes") {
        retrieveDogs();
    } else {
        find(searchSize, "size");
    }
}, [find, searchSize, retrieveDogs]);

const retrieveNextPage = useCallback(() => {
    if (currentSearchMode === "findByTitle") {
        findByBreed();
    } else if (currentSearchMode === "findbySize") {
        findBySizes();
    } else {
        retrieveDogs();
    }
}, [currentSearchMode, findByBreed, findBySizes, retrieveDogs]);

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
        const searchBreed = e.target.value;
        setSearchBreed(searchBreed);
    }

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
                            placeholder="Search by breed"
                            value={searchBreed}
                            onChange={onChangeSearchBreed}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
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
                                    { size.map((size, i) => {
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
                            variant="primary"
                            type="button"
                            onClick={findBySizes}
                            >
                                Search
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="movieRow">
                    { dogs.map((dog) => {
                        return(
                            <Col key={dog._id}>
                                <Card className="moviesListCard">
                                    <Card.Img
                                    className="smallPoster"
                                    src={dog.poster+"/100x180"} />
                                    <Card.Body>
                                        <Card.Title> {dog.Breed}</Card.Title>
                                        <Card.Text>
                                            Rating: {dog.size}
                                        </Card.Text>
                                        <Card.Text>
                                            {dog.plot}
                                        </Card.Text>
                                        <Link to={"/dogs/"+dog._id}>
                                            View Reviews
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