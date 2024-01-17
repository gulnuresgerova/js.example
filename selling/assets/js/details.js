let id = new URLSearchParams(window.location.search).get("id");
console.log(id)
const details = document.querySelector(".details");
const goback = document.querySelector(".goback");
const BASE_URL = "http://localhost:4044/products"


fetch(`${BASE_URL}/${id}`)
  .then((res) => res.json())
  .then((el) => {
    details.innerHTML = `
    <div class="card">
    <div class="card-image">
      <img
        src="${el.img}"
        alt=""
      />
    </div>
    <h2 class="card-title">${el.title}</h2>
    <p class="card-body">${el.body}</p>
   <p>
   <b>Information:</b> <br>
   Bir gün şah mollanı yanına çağırıb sual verir, amma suala da şərt qoyur ki əgər bilməsə çoxlu pul istəyəcəklər, əgər bilsə şah ona çoxlu pul verəcək. Molladan soruşdular: —Molla göydə neçə ulduz var —Molla bir qədər fikirləşib deyir: —Eşşəyimin tükü qədər. Əgər əmin deyilsizsə onda sayın. Şah onu saya bilmədiyindən pulu ona verməli olur.</p>

</div>
    `;
  });

  goback.addEventListener("click", function () {
    window.history.back();
  });