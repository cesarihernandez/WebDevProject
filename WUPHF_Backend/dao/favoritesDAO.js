let favoritesCollection;

// Handles favorites operation in the database
export default class FavoritesDAO {

    // Connect to the database
    static async injectDB(conn) {
        if (favoritesCollection) {
            return;
        }
        try {
            favoritesCollection = await conn.db(process.env.DOGREVIEWS_COLLECTION).collection('favorites');
        } catch (e) {
            console.error(`Unable to connect in FavoritesDAO: ${e}`);
        }
    }

    // Update favorites
    static async updateFavorites(userId, favorites) {
        try {
            const updateResponse = await favoritesCollection.updateOne(
                { _id: userId },
                { $set: { favorites: favorites }},
                { upsert: true }
            )
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update favorites: ${e}`);
            return { error: e };
        }
    }

    // Get favorites
    static async getFavorites(id) {
        let cursor;
        try {
            cursor = await favoritesCollection.find({
                _id: id
            });
            const favorites = await cursor.toArray();
            return favorites[0];
        } catch (e) {
            console.error(`Something went wrong in getFavorites: ${e}`);
            throw e;
        }
    }
}