import { ApiConst } from "../../constants/api";

export function getJwtToken() {
	return window.localStorage.getItem(ApiConst.ACCESS_TOKEN)
}

export function deleteJwtToken() {
	window.localStorage.removeItem(ApiConst.ACCESS_TOKEN)
}
