const BASE_URL = "http://localhost:3366/ menu";
let tbody = document.querySelector("tbody");
const form = document.querySelector("form");
let allInputs = document.querySelectorAll("input");

// 
let editId = null;
async function getData() {
    let res = await axios(`${BASE_URL}`);
   console.log(res.data)
    drawTable(res.data);
  }
  getData();

  function drawTable(data) {
    tbody.innerHTML = "";
    data.forEach((el) => {
    let tr = document.createElement("tr");
      tr.innerHTML += `
      <td>${el.id}</td>
      <td><img src="${el.img}" alt=""></td>
      <td>${el.title}</td>
      <td>${el.desc}</td>
      <td>${el.price}</td>
      <td><button class="edit"  onclick="editBtn(${el.id})" >Edit</button></td>
      <td><button class="delete" onclick=deleteElem("${el.id}",this)>Delete</button></td>
          
          
          `;
          tbody.append(tr)
    });
  }
  async function deleteElem(id, btn) {
    try {
      if (window.confirm("do you delete ??")) {
        await axios.delete(`${BASE_URL}/${id}`);
        btn.closest("tr").remove();
      }
    } catch (error) {
      console.log(error);
    }
  }


  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    let obj = {
      title: allInputs[1].value,
      desc: allInputs[2].value,
      price: allInputs[3].value,
      img: `./assets/img/${allInputs[0].value.split("\\")[2]}`,
    };
  
    if (!editId) {
      if (
        allInputs[0].value != "" &&
        allInputs[1].value != "" &&
        allInputs[2].value != "" &&
        allInputs[3].value != ""
      ) {
        await axios.post(`${BASE_URL}`, obj);
      } else {
        alert("do you full this? ");
      }
    } else {
      await axios.patch(`${BASE_URL}/${editId}`, obj);
    }
  });
 
  async function editBtn(id) {
    editId = id;
    const res = await axios(`${BASE_URL}/${id}`);
    allInputs[1].value = res.data.title;
    allInputs[2].value = res.data.desc;
    allInputs[3].value = res.data.price;

  }