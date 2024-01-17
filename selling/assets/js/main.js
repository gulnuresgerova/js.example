const BASE_URL = "http://localhost:4044/products"
let cards = document.querySelector(".cards")
let sort = document.querySelector(".sort")
let search = document.querySelector(".search")

let products = null;
let productsCopy = null;
async function getData(){
    let res = await axios(`${BASE_URL}`)
    products=res.data;
    productsCopy=structuredClone(products)
    drawCards(res.data)
}
getData();

function drawCards(data){
    cards.innerHTML="";
    data.forEach((el)=>{
        cards.innerHTML += `
        <div class="card">
        <div class="card-image">
        <img src="${el.img}" alt="" />
    </div>
        <div class="card-name">
            <h3>${el.title}</h3>
        </div>
        <div class="icons">
          <a href="./details.html?id=${el.id}">  <i class="fa-solid fa-eye"></i>
          </a>

            <p>5.0</p>
            <i class="fa-regular fa-heart"></i>
            <p>29</p>


        </div>
        <div class="description"><em>${el.body}</em></div>
        <div class="buttons">
        <a href="./form.html?id=${el.id}" class="black">Edit
        </a>
            <button onclick="deletecards(${el.id}, this)" class="white">Delete</button>
        </div>
    </div>
        `
    })
}


async function deletecards(id , btn){
    try{
        if(window.confirm("do you delete this card?")){
            await axios.delete(`${BASE_URL}/${id}`);
            btn.closest(".cards").remove();
        }
    }
    catch(error){
        console.log(error)
    }
}

search.addEventListener("input", function (element) {
    let filtered = products.filter((item) => {
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
      sorted = products.sort((a, b) => a.title.localeCompare(b.title));
      this.innerText = "Descending";
    } else if (this.innerText == "Descending") {
      sorted = products.sort((a, b) => b.title.localeCompare(a.title));
      this.innerText = "Default";
    } else {
      this.innerText = "Ascending";
      sorted = productsCopy;
    }
    drawCards(sorted);
  });
  