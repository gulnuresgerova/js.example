let id = new URLSearchParams(window.location.search).get("id");

console.log(id);
const details = document.querySelector(".details");
const goback = document.querySelector(".goback")
const BASE_URL = "http://localhost:3366/ menu";

fetch(`${BASE_URL}/${id}`)
  .then((res) => res.json())
  .then((el) => {
    details.innerHTML = `
    <div class="box">
    <div class="box-img"><img src="${el.img}" alt=""></div>
    <div class="box-body">
        <h5 class="title">${el.title} <br>
        Ilfo: <br>
        Konu Acma Yetkiniz Yok
Cevap Yazma Yetkiniz Yok
Eklenti Yükleme Yetkiniz Yok
Mesajınızı Değiştirme Yetkiniz Yok</h5>
        <p class="desc">${el.desc}</p>
    </div>
    <div class="price">
        <h3>$${el.price}</h3>
    </div>
</div>
    
    `;
  });

  goback.addEventListener("click" , function(){
    window.history.back()
  })
