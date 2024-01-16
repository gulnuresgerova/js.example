let cards = document.querySelector(".cards");
let search = document.querySelector(".search");
let sort = document.querySelector(".sort");
const BASE_URL = "http://localhost:4040/gym";

let gym = null;
let gymCopy = null;
async function getData() {
  let response = await axios(`${BASE_URL}`);

  gym = response.data;
  gymCopy = structuredClone(gym);
  drawCards(response.data);
}
getData();

function drawCards(data) {
  cards.innerHTML = "";
  data.forEach((el) => {
    cards.innerHTML += `
    <div class="card">
        <div class="card-image">
            <img src="${el.img}" alt="" />
        </div>
        <h2 class="card-title">${el.title}</h2>
        <p class="card-body">${el.body}</p>
        <div class="card-icon">
            <i class="fa-solid fa-heart"></i>
            <a href="./form.html?id=${el.id}" > <i class="fa-solid fa-pen"></i></a>
            <i onclick="deletecard(${el.id},this)" class="fa-solid fa-trash"></i>
            <a href="./details.html?id=${el.id}" > <i class="fa-solid fa-eye"></i></a>
        </div>
    </div> 
    `;
  });
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
