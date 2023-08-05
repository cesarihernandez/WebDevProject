import axios from 'axios';

class DogDataService {

    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs?page=${page}`);

    }

    find(query, by='dog_breed', page=0) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs?${by}=${query}&page=${page}`);
    }
    
    getSizes() {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/dogs/sizes`);
    }
}

export default new DogDataService();