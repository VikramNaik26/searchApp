export const deleteSearchResult = () => {
  const parentElem = document.getElementById("searchResult");
  let child = parentElem.lastElementChild;
  while (child) {
    // child.remove();
    parentElem.removeChild(child);
    child = parentElem.lastElementChild;
  }
};

export const buildSearchResult = (resultArray) => {
  resultArray.forEach((result) => {
    const resultItem = createResultItem(result);
    const resultContent = document.createElement("div");
    resultContent.classList.add("resultContent");
    if (result.img) {
      const resultImage = createResultImage(result);
      resultContent.appendChild(resultImage);
    }
    const resultText = createResultText(result);
    resultContent.appendChild(resultText);
    resultItem.appendChild(resultContent);
    const searchResult = document.getElementById("searchResult");
    searchResult.appendChild(resultItem);
  });
};

const createResultItem = (result) => {
  const resultItem = document.createElement("div");
  resultItem.classList.add("resultItem");
  const resultTitle = document.createElement("div");
  resultTitle.classList.add("resultTitle");
  const link = document.createElement("a");
  link.href = `https://en.wikipedia.org/?curid=${result.id}`;
  link.textContent = result.title;
  link.target = "_blank";
  resultTitle.appendChild(link);
  resultItem.appendChild(resultTitle);
  return resultItem;
};

const createResultImage = (result) => {
  const resultImage = document.createElement("div");
  resultImage.classList.add("resultImage");
  const img = document.createElement("img");
  img.src = result.img;
  img.alt = result.title;
  resultImage.appendChild(img);
  return resultImage;
};

const createResultText = (result) => {
  const resultText = document.createElement("div");
  resultText.classList.add("resultText");
  const resultDescription = document.createElement("p");
  resultDescription.classList.add("resultDescription");
  resultDescription.textContent = result.text;
  resultText.appendChild(resultDescription);
  return resultText;
};

export const clearStatsLine = () => {
  document.getElementById("stats").textContent = "";
};

export const setStatsLine = (numberOfResults) => {
  const statsLine = document.getElementById("stats");
  if (numberOfResults) {
    statsLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statsLine.textContent = "Sorry not resolved";
  }
};
