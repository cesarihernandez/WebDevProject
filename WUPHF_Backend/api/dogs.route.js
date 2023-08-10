import express from 'express';
import DogsController from './dogs.controller.js';
import ReviewsController from './reviews.controller.js';
import FavoritesController from './favorites.controller.js';

const router = express.Router();

// Dogs routes
router.route('/').get(DogsController.apiGetDogs);
router.route('/id/:id').get(DogsController.apiGetDogById);
router.route('/sizes').get(DogsController.apiGetSizes);

// Reviews routes
router.route("/review")
  .post(ReviewsController.apiPostReview)
  .put(ReviewsController.apiUpdateReview)
  .delete(ReviewsController.apiDeleteReview);

// Favorites routes
router.route("/favorites")
  .put(FavoritesController.apiUpdateFavorites);

router.route("/favorites/:userId")
  .get(FavoritesController.apiGetFavorites);

export default router;
