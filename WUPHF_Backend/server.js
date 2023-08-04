// Server Code, uses Express framework.
import express from 'express';
import cors from 'cors';
import dogs from './api/dogs.route.js';

// Create Express application.
const app = express();

// Add middleware to app.
app.use(cors());
app.use(express.json());

// Set up the base URL for our API. All requests to this URL will be sent to dogs.route.js.
app.use('/api/v1/dogs', dogs);

// All other URLs will result in a 404 error.
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;