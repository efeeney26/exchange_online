/*
import { ApiConst } from "../constants/api";
import { getJwtToken, deleteJwtToken } from "./services/securityService";

const defaultHeaders = new Headers({
	'Content-Type': 'application/json'
});

async function request(options) {
	const {url} = options;
	const urlWithParams = new URL(`${ApiConst.BASE_URL}/${url}`);
	const jwtToken = getJwtToken();
	if (jwtToken && jwtToken !== '') {
		defaultHeaders.append('Authorization', `Baerer ${jwtToken}`)
	}
	const headers = {
		...defaultHeaders
	};
	options = {
		...headers,
		...options
	};

	// TODO rewrite this shit
	try {
		const response = await fetch(urlWithParams.toString(), options)
		if (response.status >= 200 && response.status < 300)
			return response.json();
		if (response.status === 401) {
			deleteJwtToken();
			return Promise.reject(new Error('Auth failed'))
		}
		return Promise.reject('error')
	} catch (e) {
		return  Promise.reject(e);
	}
}

export async function apiGet(...rest) {
	return request(...rest);
}

export async function apiPost(url, body) {
	return request({
		url,
		method: 'POST',
		body: JSON.stringify(body)
	})
}
*/

import {ApiConst} from "../constants/api";
import {deleteJwtToken} from "./services/securityService";

const request = (options) => {
	const headers = new Headers({
		'Content-Type': 'application/json',
	})

	if(localStorage.getItem(ApiConst.ACCESS_TOKEN)) {
		headers.append('Authorization', 'Bearer ' + localStorage.getItem(ApiConst.ACCESS_TOKEN))
	}

	const defaults = {headers: headers};
	options = Object.assign({}, defaults, options);

	return fetch(options.url, options)
		.then(response =>
			response.json().then(json => {
				if(!response.ok) {
					return Promise.reject(json);
				}
				return json;
			})
		);
};

export function login(loginRequest) {
	return request({
		url: ApiConst.BASE_URL + "/auth/signin",
		method: 'POST',
		body: JSON.stringify(loginRequest)
	});
}

export function logout() {
	deleteJwtToken();
}

export function checkCurrentUser() {
	return request({
		url: ApiConst.BASE_URL + "/user/me",
		method: 'GET'
	})
}