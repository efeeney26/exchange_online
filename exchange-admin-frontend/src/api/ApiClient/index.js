import ApiClient from './ApiClient'
import { ApiConst } from "../../constants/api";

export const Api = new ApiClient({
	baseUrl: ApiConst.BASE_URL
});
