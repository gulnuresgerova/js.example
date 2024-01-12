const BASE_URL = `http://localhost:4000`;
const products = document.querySelector(".products");
const favCount = document.querySelector(".fav-count");

const favoritedProducts = getFavoritesFromLocaleStorage();

drawCards(favoritedProducts);
function drawCards(data) {
  products.innerHTML = "";

  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    const productTitleDivElement = document.createElement("div");
    productTitleDivElement.className = "product-card-title";

    const productTitleElement = document.createElement("h2");
    productTitleElement.textContent = element.title;
    const favIconElement = document.createElement("i");

    const favoritObj = favoritedProducts.find((item) => item.id === element.id);

    favIconElement.className = "fa-solid fa-heart";

    const productPriceElement = document.createElement("p");
    productPriceElement.innerHTML = ` <b> ${element.price}</b>`;



    const productImageElement = document.createElement("img");

    productImageElement.src = element.imageUrl;

    favIconElement.addEventListener("click", function () {
      let favorits = getFavoritesFromLocaleStorage();

      let filtered = favorits.filter((item) => item.id !== element.id);

      setProductToLocaleStorage(filtered);
      productCardElement.remove();
    });

    productTitleDivElement.append(productTitleElement, favIconElement);

    productCardElement.append(
      productTitleDivElement,
      productImageElement,
      productPriceElement
     
    );

    products.append(productCardElement);
  });
}

function setProductToLocaleStorage(products) {
  localStorage.setItem("favs", JSON.stringify(products));
}

function getFavoritesFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("favs")) ?? [];
}