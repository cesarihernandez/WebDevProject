// This file will handle data requests specific to dogs.
import DogsDAO from '../dao/dogsDAO.js';

export default class DogsController {

    // Gets all dogs - 20 per page.
    static async apiGetDogs(req, res, next) { // req = HTTP request object. res = response object created below. next = callback function.

        // Set paging information that will be optionally passed in along with the HTTP request.
        const dogsPerPage = req.query.dogsPerPage ?
            parseInt(req.query.dogsPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // Set filters on size and dog_breed based on what are submitted with the query. These are attributes of req.query.
        // NOTE: This may need to be edited to filter based on ratings above or below a certain threshhold for a given attribute.
        let filters = {};
        if (req.query.size) {
            filters.size = req.query.size;
        } else if (req.query.dog_breed) {
            filters.dog_breed = req.query.dog_breed;
        }

        // Make request to the DogsDAO object using its getDogs method.
        const { dogsList, totalNumDogs } = await
            DogsDAO.getDogs({ filters, page, dogsPerPage });

        // Take info retrieved by the DAO, package it into an object called response and put it into the HTTP response object as JSON.
        // This response is what will be sent back to the client.
        let response = {
            dogs: dogsList,
            page: page,
            filters: filters, 
            entries_per_page: dogsPerPage,
            total_results: totalNumDogs,
        };
        res.json(response);
    }

    // Gets a single dog given its specific ID value.
    static async apiGetDogById(req, res, next) {
        try {
            // Get ID from URL.
            let id = req.params.id || {};
            // Call apiGetDogByID using id to return the dog.
            let dog = await DogsDAO.apiGetDogByID(id);
            // If no dog is found...
            if (!dog) {
                res.status(404).json({ error: "Dog Not Found" });
                return;
            }
            // Else, package dog into an object and send it back to client.
            res.json(dog);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    // Query the database for all distinct "rating" values in the dogs database.
    // No data needed from the request.
    // NOTE: May need to be updated to accomodate multiple rating attributes.
    static async apiGetSizes(req, res, next) {
        try {
            let sizes = await DogsDAO.getSizes();
            res.json(sizes);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}