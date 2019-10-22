class API {
    constructor() {
	    this.BASE_URL = "https://api.football-data.org/v2";
    }

    async sendRequest(method, url, data, headers) {
        headers = {
            ...headers,
			"X-Auth-Token": "8cd109a7cd8a4fd599ae76de90536c6a"
        }
        return fetch(url, {
            method,
            headers
        });
    }
}


export default new API();