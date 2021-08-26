import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refreshAccessToken({ commit }, access_token) {
      commit('refreshAccessToken', access_token);
    },
    updateUser({ commit }, user){
      commit('updateUser', user);
    }
  },
  mutations: {
    updateUser(state, user){
      state.user = user;
    },
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
     // state.user = user;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refreshAccessToken(state, access_token) {
      state.status.loggedIn = true;
      state.user = { ...state.user, access_token: access_token };
    }
  }
};