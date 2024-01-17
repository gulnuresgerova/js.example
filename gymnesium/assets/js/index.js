let cards = document.querySelector(".cards");
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
const BASE_URL = "http://localhost:4050/gym";

let gym = null;
let gymCopy = null;

let favProducts = getFavsFromLocaleStorage();
let products = [];

async function getData() {
  let response = await axios(`${BASE_URL}`);
  products = response.data;
  gym = response.data;
  gymCopy = structuredClone(gym);
  drawCards(response.data);
}
getData();

function drawCards(data) {
  cards.innerHTML = "";
  data.forEach((el) => {
    // console.log(el.id);
    cards.innerHTML += `
    <div class="card">
        <div class="card-image">
            <img src="${el.img}" alt="" />
        </div>
        <h2 class="card-title">${el.title}</h2>
        <p class="card-body">${el.body}</p>
        <div class="card-icon">
        <i class="${
          favProducts?.some((item) => item?.id === el?.id)
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart"
        }" onclick=addToFav("${el.id}",this)></i>

            <a href="./form.html?id=${
              el.id
            }" > <i class="fa-solid fa-pen"></i></a>

            
            <i onclick=deletecard("${
              el.id
            }",this) class="fa-solid fa-trash"></i>

            <a href="./details.html?id=${
              el.id
            }" > <i class="fa-solid fa-eye"></i></a>
        </div>
    </div> 
    `;
  });
}



function addToFav(id, icon) {
  if (icon.className === "fa-regular fa-heart") {
    icon.className = "fa-solid fa-heart";
  } else {
    icon.className = "fa-regular fa-heart";
  }

  let favs = getFavsFromLocaleStorage() ?? [];

  let bool = favs.find((item) => item.id == id);

  let product = gym.find((item) => item.id == id);


  if (bool) {
    favs = favs.filter((item) => item.id != id);
  } else {
    favs.push(product);
  }

  setFavsToLocaleStorage(favs);
}

function setFavsToLocaleStorage(favs) {
  localStorage.setItem("cards", JSON.stringify(favs));
}
function getFavsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem("cards")) || [];
}





async function deletecard(id, btn) {
  try {
    if (window.confirm("do you delete card??")) {
      await axios.delete(`${BASE_URL}/${id}`);
      btn.closest(".cards").remove();
    }
  } catch (error) {
    console.log(error);
  }
}

search.addEventListener("input", function (element) {
  let filtered = gym.filter((item) => {
    return item.title
      .toLocaleLowerCase()
      .includes(element.target.value.toLocaleLowerCase());
  });
  drawCards(filtered);
  console.log(filtered);
});

sort.addEventListener("click", function () {
  let sorted;
  if (this.innerText == "Ascending") {
    sorted = gym.sort((a, b) => a.title.localeCompare(b.title));
    this.innerText = "Descending";
  } else if (this.innerText == "Descending") {
    sorted = gym.sort((a, b) => b.title.localeCompare(a.title));
    this.innerText = "Default";
  } else {
    this.innerText = "Ascending";
    sorted = gymCopy;
  }
  drawCards(sorted);
});
