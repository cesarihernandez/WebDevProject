import axios from 'axios'

class FavoriteDataService {

    updateFavoritesList(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/favorites`, data);
    }

    getAll(userId)  {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/favorites/${userId}`);
    }
    
  }
  
  
  export default new FavoriteDataService();


    
  