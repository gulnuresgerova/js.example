const BASE_URL = "http://localhost:3366/ menu";
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
let main = document.querySelector(".main");
let dessert = document.querySelector(".dessert");
let drinks = document.querySelector(".drinks");
let allBtns = document.querySelectorAll(".btn");
let menu = document.querySelector(".menu");

arr = [];
let menus = null;
let menusCoy = null;

async function getData() {
  let res = await axios(`${BASE_URL}`);
  menus= res.data;
  menusCoy= structuredClone(menus);
  let fixed= res.data.filter((item)=> item.category == "main")
//   console.logo(fixed);
  arr = res.data;
  drawCards(fixed);
}
getData();

function drawCards(data) {
  menu.innerHTML = "";
  data.forEach((el) => {
    menu.innerHTML += `
        <div class="box">
        <div class="box-img"><img src="${el.img}" alt=""></div>
        <div class="box-body">
            <h5 class="title">${el.title}...... <a href="./details.html?id=${el.id}" >Read More</a></h5>
            <p class="desc">${el.desc}</p>
        </div>
        <div class="price">
            <h3>$${el.price}</h3>
        </div>
    </div>
        
        
        
        `;
  });
}

main.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "main");
  drawCards(filtered);
});
dessert.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "dessert");
  drawCards(filtered);
});
drinks.addEventListener("click", function () {
  let filtered = arr.filter((item) => item.category == "drinks");
  drawCards(filtered);
});

allBtns.forEach((element) => {
    element.addEventListener("click", function () {
      document.querySelector(".buttons.active").classList.remove("active");
      this.classList.add("active");
    });
  });


  sort.addEventListener("click" , function(){
    let sorted;
    if(this.innerText=="Asc"){
        sorted = menus.sort((a,b) => a.title.localeCompare(b.title));
        this.innerText="Desc"
    }
    else if(this.innerText=="Desc"){
        sorted = menus.sort((a,b)=> b.title.localeCompare(a.title));
        this.innerText="Default"
    }
    else{
        this.innerText="Asc";
        sorted=menusCoy;  }
        drawCards(sorted)
  })

  search.addEventListener("input" , function(e){
    let b = menus.filter((item)=>{
        return item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
    })
    drawCards(b);
    console.log(b)
  })