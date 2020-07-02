const axios = require("axios");

const axiosRetry = require("axios-retry");

axiosRetry(axios, { retries: 10, retryDelay: 1000 });

module.exports.makeGetRequest = (url) => axios.get(url).then((res) => res.data);
