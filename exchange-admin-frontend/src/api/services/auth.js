import { getJwtToken } from "./securityService";

/*import { apiPost } from '../apiClient'

export async function login(loginRequest) {
	return apiPost({
		url: '/auth/signin',
		body: loginRequest
	})
}*/

export const isLoggedIn = () => {
	console.log('token', getJwtToken())
	return !!getJwtToken();
}
