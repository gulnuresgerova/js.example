
let id = new URLSearchParams(window.location.search).get("id");

console.log(id);
const productCardLists = document.querySelector(".product-card-lists");

const BASE_URL = `http://localhost:8080`;

fetch(`${BASE_URL}/products/${id}`)
  .then((res) => res.json())
  .then((element) => {
    productCardElement.className = "product-card";
    productCardElement.innerHTML = `
    <div class="product-top">
    <div class="image">
      <img
        src="${element.imgUrl}"
        alt=""
      />
    </div>
    <h4>${element.productName}</h4>
  </div>
  <div class="porduct-bootom">
    <p>
    ${element.price}
    </p>
    <div class="icons">
  
      <a href="details.html?id=${element.id}" class="details"><i class="fa-solid fa-eye"></i></a>
    </div>
  </div>
    `;
    productCardLists.append(productCardElement);
  });

function goBack() {
  window.history.back();
}