const cheerio = require("cheerio");

module.exports.getCheerioFromHTML = (htmlPage) => cheerio.load(htmlPage);
