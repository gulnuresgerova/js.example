const BASE_URL = `//localhost:8000`;

function setProductToLocaleStorage(favs) {
  localStorage.setItem("favs", JSON.stringify(favs));
}

function getFavsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) || [];
}