export const getSearchTerm = () => {
  const rawSearchTerm = document.getElementById("search").value.trim();
  const regex = /[ ]{2,}/gi;
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");
  return searchTerm;
};

export const retrieveSearchResults = async (searchTerm) => {
  const wikiSearchStream = getWikiSearchStream(searchTerm);
  // console.log(wikiSearchStream);
  const wikiSearchResults = await requestData(wikiSearchStream);
  // console.log(wikiSearchResults.hasOwnProperty("query"));
  let resultArray = [];
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResult(wikiSearchResults.query.pages);
    // console.log(resultArry)
  }
  // console.log(resultArry);
  return resultArray;
};

const getWikiSearchStream = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
  const searchString = encodeURI(rawSearchString);
  return searchString;
};

const getMaxChars = () => {
  const width = window.innerWidth || document.body.clientWidth;
  let maxChars;
  if (width < 414) maxChars = 45;
  if (width >= 414 && width < 1400) maxChars = 100;
  if (maxChars >= 1400) maxChars = 130;
  return maxChars;
};

const requestData = async (searchString) => {
  try {
    const response = await fetch(searchString);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const processWikiResult = (result) => {
  const resultArray = [];
  Object.keys(result).forEach((key) => {
    const id = key;
    const title = result[key].title;
    const text = result[key].extract;
    const img = result[key].hasOwnProperty("thumbnail")
      ? result[key].thumbnail.source
      : null;
    const item = {
      id,
      title,
      img,
      text,
    };
    // console.log(item);
    resultArray.push(item);
  });
  return resultArray;
};
