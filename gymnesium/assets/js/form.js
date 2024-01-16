const id = new URLSearchParams(window.location.search).get("id");
const inputs = document.querySelectorAll(".form-control");
const form = document.querySelector("form");
let textarea = document.querySelector("textarea");
const BASE_URL = "http://localhost:4040/gym";
if (id) {
  axios(`${BASE_URL}/${id}`).then((res) => {
    inputs[0].value = res.data.title;
    textarea.value = res.data.body;
  });
}
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    title: inputs[0].value,
    body: textarea.value,
    img: `./assets/img/${inputs[1].value.split("\\")[2]}`,
  };

  console.log(inputs[1].value);

  if (!id) {
    axios.post(`${BASE_URL}`, obj);
  } else {
    axios.patch(`${BASE_URL}/${id} `, obj);
  }
  console.log(inputs);

  inputs.forEach((item) => {
    item.value = "";
  });
  textarea.forEach((item) => {
    item.value = "";
  });
});
