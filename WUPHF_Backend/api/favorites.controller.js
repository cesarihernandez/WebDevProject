import FavoritesDAO from '../dao/favoritesDAO.js';

// Favorites controller handles API requests
export default class FavoritesController {

    // Update favorites for a user
    static async apiUpdateFavorites(req, res, next) {
        try {
            // Call updateFavorites from FavoritesDAO
            const FavoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            )

            // Check for errors in the FavoritesResponse
            var { error } = FavoritesResponse
            if (error) {
                res.status(500).json({ error });
            }

            res.json({ status: "success" });
        } catch(e) {
            res.status(500).json({ error: e.message })
        }
    }

    // Get favorites for a user
    static async apiGetFavorites(req, res, next) {
        try {
            // Get user ID from params
            let id = req.params.userId;

            // Call getFavorites from FavoritesDAO
            let favorites = await FavoritesDAO.getFavorites(id);

            // If favorites not found...
            if (!favorites) {
                res.status(404).json({ error: "not found" });
                return;
            }
            res.json(favorites);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}