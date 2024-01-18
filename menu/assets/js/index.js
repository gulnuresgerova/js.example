const BASE_URL = `http://localhost:1955/menu`;
const menu = document.querySelector(".menus");
const breakfast = document.querySelector(".breakfast");
const brunch = document.querySelector(".brunch");
const lunch = document.querySelector(".lunch");
const dinner = document.querySelector(".dinner");
const allBtns = document.querySelectorAll(".btn");

let arr = [];

async function getData() {
  const res = await axios(`${BASE_URL}`);
  arr = res.data;
  console.log(res.data);
  drawCards(res.data);
}
getData();

function drawCards(data) {
  menu.innerHTML = "";
  data.forEach((element) => {
    console.log();
    menu.innerHTML += `

    <div class="card">
    <h4 class="title">${element.title}</h4>
   <div class="card-bottom">
    <p class="desc gry">${element.desc}</p>
    <p class="gry">...............................................................................</p>
    <p class="price">${element.price}</p>
   </div>
</div>
    
    
    `;
  });
}

breakfast.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.companyName == "breakfast");
  drawCards(filtered);
  console.log(filtered);
});
lunch.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.companyName == "lunch");
  drawCards(filtered);
});

dinner.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.companyName == "dinner");
  drawCards(filtered);
});

brunch.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.companyName == "brunch");
  drawCards(filtered);
});

allBtns.forEach((element) => {
  element.addEventListener("click", function () {
    document.querySelector(".buttons .active").classList.remove("active");
    this.classList.add("active");
  });
});
