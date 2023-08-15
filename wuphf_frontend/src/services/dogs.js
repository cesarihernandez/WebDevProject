import axios from 'axios';

class DogDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs?page=${page}`);

    }

    find(query, by='dog_breed', page=0) {
        return axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs?${by}=${query}&page=${page}`
            );
    }
    
    getSizes() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/sizes`);
    }

    get(id) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/id/${id}`);
      }

    createReview(data) {
        return axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/review`, data);
    }

    updateReview(data) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/review`, data);
      }
  
    deleteReview(data) {
        return axios.delete(
          `${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/review`, { data });
      }
}

export default new DogDataService();