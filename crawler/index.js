const { makeGetRequest } = require("./api-call");

const { getCheerioFromHTML } = require("./cheerio-methods");

const { filterArray } = require("./utils");

/**
 * Crawls a website using a start {url}, and returns the lexicographically smallest string.
 * @param url
 * @return {Promise.<string>}
 */
module.exports = (url = "http://localhost:8080") => {
  return new Promise(async (resolve, reject) => {
    console.time("executionTime");
    const bodyData = [];
    const subLinks = [];
    let subLinkIndex = 0;

    do {
      let subLinkUrl = `${url}${subLinks[subLinkIndex] || ""}`;

      if (!subLinks[subLinkIndex] && subLinks.length > 0) {
        reject("Something is wrong in traversing link");
        break;
      }

      let result;
      try {
        result = await makeGetRequest(subLinkUrl);
      } catch (error) {
        let errorText = error.message
          ? error.message
          : "Something went wrong, please re-run code";

        reject(errorText);
        break;
      }

      let $ = getCheerioFromHTML(result);

      let tempLinkArr = [];

      $(".link").each((_, element) => tempLinkArr.push(element.attribs.href));

      $(".codes h1").each((_, element) => bodyData.push($(element).html()));

      let newSubLinks = filterArray(subLinks, tempLinkArr);
      subLinks.push(...newSubLinks);

      ++subLinkIndex;
    } while (subLinks[subLinkIndex]);

    let finalResult = bodyData.sort((a, b) => a.localeCompare(b))[0];

    console.timeEnd("executionTime");
    resolve(finalResult);
  });
};
