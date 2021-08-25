import axios from 'axios';


const API_URL = 'http://192.168.0.20:9001/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'user/signIn', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data));

          console.log(localStorage.getItem('user'))
          console.log(parseJwt(response.data.access_token))
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL, {
      username: user.username,
      email: user.email,
      password: user.password
    });
  }
}

export default new AuthService();