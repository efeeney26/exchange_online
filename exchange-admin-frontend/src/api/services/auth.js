import { getJwtToken, deleteJwtToken } from "./securityService";
import {Api} from "../ApiClient";

export async function login(loginRequest) {
	return Api.post('/auth', loginRequest)
}

export function logout() {
	return deleteJwtToken();
}

export const isLoggedIn = () => {
	return !!getJwtToken();
};
