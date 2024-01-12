const form = document.querySelector("form");
const allInputs = document.querySelectorAll("input");
const BASE_URL = ` //localhost:8000`;
const errorMessage = document.querySelector(".error-message");
form.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    if (
      allInputs[0].value.trim() &&
      allInputs[1].value.trim() &&
      allInputs[2].value.trim()
    ) {
      let product = {
        productName: allInputs[0].value,
        price: allInputs[1].value,
        imgUrl: allInputs[2].value,
      };
      if(id){
        axios.patch(`${BASE_URL}/${id} `,obj)
    }else{
        axios.post(`${BASE_URL}`, obj) 
    }
    window.location = "index.html"
    
      const res = await axios.post(`${BASE_URL}/products`, product);
      errorMessage.style.opacity = "0";
    } else {
      errorMessage.style.opacity = "1";
    }
  } catch (error) {
    console.log(error);
  }
});