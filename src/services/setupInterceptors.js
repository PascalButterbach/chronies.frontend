import axiosInstance from "./api";
import TokenService from "./token.service";
import axios from "axios";

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = 'Bearer ' + token;  
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      if (originalConfig.url !== "user/signIn" && err.response) {
        
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;          
          
          try {
            const instance = axios.create({
              baseURL: 'http://192.168.0.69:8999/',
              timeout: 1000,
              headers: {'Authorization': 'Bearer '+ TokenService.getLocalRefreshToken()}
            }); 

            const rs = await instance.post("token/");
            
            const access_token = rs.data.access_token;            
            TokenService.updateLocalAccessToken(access_token);
            
            const refresh_token = rs.data.refresh_token;
            TokenService.updateLocalRefreshToken(refresh_token);
            
            store.dispatch('auth/refreshAccessToken', access_token);
            store.dispatch('auth/updateUser', rs.data)

            return axiosInstance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;