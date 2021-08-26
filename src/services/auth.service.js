import api from "./api";
import TokenService from "./token.service";


class AuthService {
  async login({ email, password }) {
    const response = await api
      .post("user/signIn", {
        email,
        password
      });
    if (response.data.access_token) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  logout() {
    TokenService.removeUser();
  }

  async register({ user_name, email, password }) {
    const response = await api
      .post("user/", {
        user_name,
        email,
        password
      });
      if (response.data.access_token) {
        TokenService.setUser(response.data);
      }
      return response.data;
  }
}

export default new AuthService();