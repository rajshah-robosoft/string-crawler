const axios = require("axios");

module.exports.makeGetRequest = (url) => axios.get(url).then((res) => res.data);
