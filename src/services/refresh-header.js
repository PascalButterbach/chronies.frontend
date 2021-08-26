import TokenService from "./token.service";


export default function refreshHeader() {
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && TokenService.getLocalRefreshToken()) {
        return { Authorization: 'Bearer ' + TokenService.getLocalRefreshToken() };
    } else {
        return {};
    }
}