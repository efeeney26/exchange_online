import { ApiConst } from '../../constants/api';

export function getJwtToken() {
    return localStorage.getItem(ApiConst.ACCESS_TOKEN);
}

export function deleteJwtToken() {
    localStorage.removeItem(ApiConst.ACCESS_TOKEN);
}

export function setJwtToken(res) {
    localStorage.setItem(ApiConst.ACCESS_TOKEN, res[ApiConst.ACCESS_TOKEN]);
}
