import "./styles.css";
import { getSuggestions, debounce } from "./utils/utils";

const searchBox = document.getElementById("search-input");
const suggestionsSection = document.getElementById("suggestions-wrapper");

(() => {
  searchBox.addEventListener("input", debounce(handleInputChange, 500));
  suggestionsSection.addEventListener("click", handleSelected);
})();

function handleSelected(event) {
  const { key } = event.target.dataset;
  if (key) {
    searchBox.value = key;
    resetState();
  }
}

function handleInputChange(event) {
  const keyword = event.target.value;
  if (keyword.length === 0) {
    resetState();
    return;
  } else {
    handleSearch(keyword);
  }
}

const resetState = () => {
  suggestionsSection.innerHTML = "";
  suggestionsSection.classList.remove("suggestions-visible");
};

const handleSearch = async (keyword) => {
  const results = await getSuggestions(keyword);
  console.log(results);
  if (results.length) {
    suggestionsSection.classList.add("suggestions-visible");
    renderDropItems(results);
  }
};

const renderDropItems = (list) => {
  const fragment = document.createDocumentFragment();

  list.forEach((item) => {
    const element = document.createElement("div");
    element.innerHTML = item;
    element.setAttribute("data-key", item);
    element.classList.add("dropdown-item");
    fragment.appendChild(element);
  });

  suggestionsSection.innerHTML = "";
  suggestionsSection.appendChild(fragment);
};
