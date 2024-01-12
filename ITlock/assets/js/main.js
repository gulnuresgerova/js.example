const BASE_URL = `http://localhost:4000`;
const products = document.querySelector(".products");
const favCount = document.querySelector(".fav-count");
const searchInput = document.querySelector(".search");
const loadMore = document.querySelector(".load-more button");
let productsCopy = [];
let limit = 3;
const favoritedProducts = getFavoritesFromLocaleStorage();

calculateFavCount(favoritedProducts.length);

async function getProducts() {
  const response = await axios(`${BASE_URL}/products`);
  productsCopy = response.data;
  drawCards(response.data.slice(0, limit));
}

getProducts();

function drawCards(data) {
 

  data.forEach((element) => {
    const productCardElement = document.createElement("div");
    productCardElement.className = "product-card";
    const productTitleDivElement = document.createElement("div");
    productTitleDivElement.className = "product-card-title";

    const productTitleElement = document.createElement("h3");
    productTitleElement.textContent = element.title;


   


    const favIconElement = document.createElement("i");

    const favoritObj = favoritedProducts.find((item) => item.id === element.id);

    favIconElement.className = favoritObj
      ? "fa-solid fa-heart"
      : "fa-regular fa-heart";

    const productPriceElement = document.createElement("p");
    productPriceElement.innerHTML = ` <b> ${element.price}</b>`;

    const productBTN = document.createElement("div");
    productPriceElement.innerHTML = `<P>${element.price}</P>   <a href="./details.html?id=${element.id}" class="btn btn-primary">VIEW DETAILS</a> `;

    const productImageElement = document.createElement("img");
    productImageElement.src = element.imageUrl;

    favIconElement.addEventListener("click", function () {
      this.className === "fa-regular fa-heart"
        ? (this.className = "fa-solid fa-heart")
        : (this.className = "fa-regular fa-heart");

      let favorites = getFavoritesFromLocaleStorage();

      const favIndex = favorites.findIndex((item) => item.id === element.id);

      if (favIndex === -1) {
        favorites.push(element);
      } else {
        favorites.splice(favIndex, 1);
      }

      setProductToLocaleStorage(favorites);

      calculateFavCount(favorites.length);
    });

    productTitleDivElement.append(productTitleElement, favIconElement);
    // productPriceElement.append(productBTN )
    productCardElement.append(
        productTitleDivElement,
        productImageElement,

        productBTN,
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

function calculateFavCount(count) {
  favCount.textContent = count;
}

loadMore.addEventListener("click", function () {
  limit += 3;
 
  drawCards(productsCopy.slice(0, limit));
  if (limit >= productsCopy.length) {
    this.remove();
  }
});


searchInput.addEventListener("input", function (e) {
  let filtered = arr.filter((item) =>
    item.name.toLowerCase().includes(e.target.value.toLowerCase())
  );
  console.log(filtered);
  drawCards(filtered);
});
  