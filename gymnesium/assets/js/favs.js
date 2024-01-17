let cards = document.querySelector(".cards");
const BASE_URL = "http://localhost:4050/gym";

let wishlist = getProductsToLocalSotarge() ?? [];

function drawCards(data) {
  cards.innerHTML = "";
  data.forEach((el) => {
    let divelem = document.createElement("div");

    divelem.className = "card";

      divelem.innerHTML=
      `
      <div class="card-image">
      <img src="${el.img}" alt="" />
  </div>
  <h2 class="card-title">${el.title}</h2>
  <p class="card-body">${el.body}</p>
  <div class="card-icon">
  <i class="fa-solid fa-heart" onclick=addToRemove(${el.id},this)></i>
     
  </div>
`  
        ;
        cards.append(divelem);
  });
}
drawCards(favProducts);

function setProductsToLocalSotarge(arr) {
    localStorage.setItem("cards", JSON.stringify(arr));
  }
  function getProductsToLocalSotarge() {
    return JSON.parse(localStorage.getItem("cards"));
  }
  
  function addToRemove(id, i) {
    wishlist = wishlist.filter((item) => item.id !== id);
    setProductsToLocalSotarge(wishlist);
    i.parentElement.parentElement.remove();
    console.log(i);
  }