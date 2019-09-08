import _ from 'lodash';
import { getJwtToken, deleteJwtToken } from '../services/securityService';

const defaultHeaders = new Headers({
    'Content-Type': 'application/json'
});

const getHeaders = (headers) => {
    const jwtToken = getJwtToken();
    if (jwtToken && !headers.has('Authorization')) {
        headers.append('Authorization', `Bearer ${jwtToken}`);
    }
    return headers;
};

export default class ApiClient {
    constructor(config) {
        this.baseUrl = config.baseUrl;
        this.options = config.options;
    }

    async request(url, reqOptions = {}) {
        const { body, ...restOptions } = reqOptions;
        const urlWithParams = new URL(`${this.baseUrl}${url}`);
        const mergedOptions = _.merge(_.cloneDeep(this.options), restOptions);
        const headers = getHeaders(defaultHeaders);

        // TODO rewrite this shit
        try {
            const response = await fetch(urlWithParams.toString(), {
                headers,
                body,
                ...mergedOptions
            });
            if (response.status >= 200 && response.status < 300) return response.json();
            if (response.status === 401) {
                deleteJwtToken();
                return Promise.reject(new Error('Auth failed'));
            }
            return Promise.reject('error');
        } catch (e) {
            return Promise.reject(e);
        }
    }

    async get(...rest) {
        return this.request(...rest);
    }

    async post(url, body, reqOptions) {
        return this.request(url, {
            method: 'POST',
            body: JSON.stringify(body),
            ...reqOptions
        });
    }
}
