let cards = document.querySelector(".cards");
const BASE_URL = "http://localhost:4050/gym";

let favProducts = getFavsFromLocaleStorage();

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
  <i class="fa-solid fa-heart" onclick=removeFromFavs(${el.id},this)></i>
     
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
  
  function removeFromFavs(id, btn) {
    favProducts = favProducts.filter((item) => item.id !== id);
    setFavsToLocaleStorage(favProducts);
  
    btn.closest(".card").remove();
  }