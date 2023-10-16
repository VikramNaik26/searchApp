import {
  setSearchFocus,
  showClearTextBtn,
  clearSearchText,
  clearPushListener,
} from "./searchBar.js";
import { getSearchTerm, retrieveSearchResults } from "./dataFunctions.js";
import {
  buildSearchResult,
  clearStatsLine,
  deleteSearchResult,
  setStatsLine,
} from "./searchResult.js";

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initApp();
  }
});

const initApp = () => {
  // set focus
  setSearchFocus();

  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextBtn);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("searchBar");
  form.addEventListener("submit", submitTheSearch);
};

// procedural "workflow" function
const submitTheSearch = (event) => {
  event.preventDefault();
  // delete the search result
  deleteSearchResult();
  // process the search
  processTheSearch();
  // set the focus
  setSearchFocus();
};

const processTheSearch = async () => {
  // clear stats line
  clearStatsLine();
  const searchTerm = getSearchTerm();
  if (searchTerm === "") return;
  const resultArray = await retrieveSearchResults(searchTerm);
  // console.log(resultArray);
  if (resultArray.length) {
    buildSearchResult(resultArray);
  }
  setStatsLine(resultArray.length);
};
