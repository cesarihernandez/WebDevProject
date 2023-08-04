// This file handles routing of incoming http requests, based on their URLs.
import express from 'express';
import DogsController from './dogs.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoritesController from './favorites.controller.js';

// Create an Express Router object.
const router = express.Router();

// A GET request to the / URL will call apiGetDogs on the dogs controller.
router.route('/').get(DogsController.apiGetDogs);

// A GET request to the URL /id followed by an ID value for a dog will access a specific dog using apiGetDogById on the dogs controller.
router.route('/id/:id').get(DogsController.apiGetDogById);

// A GET request to the URL /ratings will call apiGetRatings on the dogs controller.
router.route('/sizes').get(DogsController.apiGetSizes);

// A POST request to the URL /review will call apiPostReview on the reviews controller.
router.route('/review').post(ReviewsController.apiPostReview);

router.route("/review").post(ReviewsController.apiPostReview)
                        .put(ReviewsController.apiUpdateReview)
                        .delete(ReviewsController.apiDeleteReview);

router.route("/favorites").put(FavoritesController.apiUpdateFavorites);

router.route("/favorites/:userId").get(FavoritesController.apiGetFavorites);

// Export router as a module so it can be imported.
export default router;