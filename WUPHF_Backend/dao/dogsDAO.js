// This file will query the MongoDB database directly for dog data. 
import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let dogs;

export default class DogsDAO {
    static async injectDB(conn) {
        // Check if 'dogs' collection is already initialized.
        if (dogs) {
            return;
        }
        try {
            // Attempt to connect to the 'dogs' collection.
            dogs = await conn.db(process.env.DOGREVIEWS_COLLECTION).collection('dogs');
        } catch (e) {
            console.error(`Unable to connect to dogsDAO: ${e}`);
        }
    }

    // Pass in default parameters.
    static async getDogs({
        filters = null,
        page = 0,
        dogsPerPage = 20,
    } = {}) { // empty object as default value

        // Construct query based on whether "dog'dog_breed" and "size" filter values exist.
        let query;
        if (filters) {
            if ('dog_breed' in filters) {
                query = { $text: { $search: filters['dog_breed'] } }; // dog'dog_breed of dog.
            } else if ('size' in filters) { // change rated to size.
                query = { 'size': { $eq: filters['size'] } };
            } 
        }

        // Make the query using MongoDB cursor object for iterating.
        let cursor;
        try {
            cursor = await dogs.find(query).limit(dogsPerPage).skip(dogsPerPage * page);
            const dogsList = await cursor.toArray(); // convert returned movies to an array.
            const totalNumDogs = await dogs.countDocuments(query); // get total number of gods.
            return {dogsList, totalNumDogs};
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return {dogsList: [], totalNumDogs: 0 };
        }
    }

    // Returns a list of all distinct dog sizes.
    static async getSizes() {
        let sizes = [];
        try {
            sizes = await dogs.distinct('size'); // Get all possible dog sizes.
            return sizes;
        } catch (e) {
            console.error(`Unable to get sizes, ${e}`);
            return sizes;
        }
    }

    // Finds a dog by ID.
    static async getDogByID(id) {
        try {
            return await dogs.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                },
                {
                    $lookup: {
                        from: 'size',
                        localField: '_id',
                        foreignField: 'dog_id',
                        as: 'size',
                    }
                }
            ]).next();
        } catch (e) {
            console.error(`Unable to get dog by ID: ${e}`);
            throw e;
        }
    }
}