// Top-level code for the backend. It will connect up our database and data access objects and set up exception handling.
import dotenv from 'dotenv';
import mongodb from 'mongodb';
import app from './server.js';
import DogsDAO from './dao/dogsDAO.js';
import ReviewsDAO from './dao/reviewsDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';

// Async to use asynchronous await keyword in body.
async function main() {
    // Set up our environment variables.
    dotenv.config()

    // Create a MongoDB client object with access to our database's URL.
    const client = new mongodb.MongoClient(
        process.env.DOGREVIEWS_DB_URI
    );

    // Set the port to the environment port variable.
    const port = process.env.PORT || 8000;

    // Connect to MongoDB Server.
    try {
        await client.connect();
        await DogsDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);

        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);