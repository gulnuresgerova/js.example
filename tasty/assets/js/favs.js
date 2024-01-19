
const BASE_URL = "http://localhost:3366/ menu";

const products = document.querySelector(".products");
const favCount = document.querySelector(".fav-count");



let favProduct = getFavaFromLocaleStrogeProduct();
calculateCount(favProduct.length);



function drawFavs(data) {
    products.innerHTML = "";
    data.forEach((el) => {
      products.innerHTML += `
      <div class="box">
        <div class="box-img"><img src="${el.img}" alt=""></div>
        <div class="box-body">
            <h5 class="title">${el.title}</h5>
            <p class="desc">${el.desc}</p>
            <i class="${
              favProduct.some((item) => item.id === el.id)
                ? "fa-solid fa-heart "
                : "fa-regular fa-heart"
            }" onclick=favIcon("${el.id}",this)></i>
        </div>
        <div class="price">
            <h3>$${el.price}</h3>
        </div>
    </div>
        
      `;
    });
  }
  drawFavs(favProduct)


  function favIcon(id,icon){
favProduct=favProduct.filter((item)=>item.id !== id)
setFavaFromLocaleStrogeProduct(favProduct)
calculateCount(favProduct.length)

icon.closest(".box").remove()
  }

function calculateCount(count){
    favCount.textContent=count
}

  function setFavaFromLocaleStrogeProduct(fav){
    localStorage.setItem("favs", JSON.stringify(fav))
  }
  function getFavaFromLocaleStrogeProduct(){
    return JSON.parse(localStorage.getItem("favs")) || []

  }