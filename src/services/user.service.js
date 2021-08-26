import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/image/');
  }

  getUserBoard() {
    return api.get('/upload');
  }
 
  // getAdminBoard() {
  //   return api.get('/test/admin');
  // }
}

export default new UserService();