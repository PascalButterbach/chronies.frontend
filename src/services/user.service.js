import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://192.168.0.69:8999/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'image/', { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'image/', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();