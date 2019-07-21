import {Api} from "../ApiClient";

export async function getCurrentUser() {
	return Api.get('/user/me')
}