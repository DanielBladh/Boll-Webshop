const articles = JSON.parse(localStorage.bollar);
const rootElement = document.querySelector("#root");

// LINA //

// Köp Knappen med click funktion 
document.getElementById("buyBtn").addEventListener("click", function () {
  console.log("KÖPT!");
})

// Modalen


function showModal() {
  let exampleModal = document.getElementById("exampleModal");
  exampleModal.addEventListener("show.bs.modal", function (event) {

    let selectedProductId = event.relatedTarget.getAttribute("data-product-id"); //rad 55
    const products = JSON.parse(localStorage.getItem("bollar")); // från Toves lista

    products.forEach((product) => {
      if (product.productId == selectedProductId) {


        setProductData("title", product);
        setProductData("price", product);
        setProductData("extraEquipment", product);
        setProductData("material", product);
        setProductData("color", product);
        setProductData("level", product);
        setProductData("category", product);
        setProductImg("img", product);
      }
    });
  });
  function setProductData(value, product) {
    document.getElementById(value).innerHTML = product[value];
  }
  function setProductImg(value, product) {
    document.getElementById(value).src = product[value];
  }
}


// LINA //

// Frank //

/* Soptunna + "Till kassan" + Kryssa rutan */

document.getElementById("bag").addEventListener("click", function () {
  const welcomeDiv = document.querySelector(".welcome");
  const cardDiv = document.querySelector(".myCards");

  if (welcomeDiv && cardDiv) {
    welcomeDiv.parentNode.removeChild(welcomeDiv);
    cardDiv.parentNode.removeChild(cardDiv);
  }

  const cartContainer = document.createElement("div");
  cartContainer.className = "basket";
  cartContainer.innerHTML = `
        <div class="box">
        <i class="bi bi-x-lg" id="closeBox"></i>
          <div class="boxItemsDark">
            <div class="contentBox">
              <img src="assets/img/basketboll.jpg" alt="Ball" />
              Basketboll
              <div id="counter-label">0</div>
              <div class="counter">
                <i class="bi bi-plus" id="plusClick"></i>
                <i class="bi bi-dash" id="minusClick"> </i>
              </div>
              <i class="bi bi-trash-fill"></i>
              <div id="price">459 kr</div>
            </div>
          </div>
          <div class="boxItemsLight">
            <div class="contentBox">
              <img src="assets/img/basketboll.jpg" alt="Ball" />
              Basketboll
              <div id="counter-label">0</div>
              <div class="counter">
                <i class="bi bi-plus" id="plusClick"></i>
                <i class="bi bi-dash" id="minusClick"> </i>
              </div>

              <i class="bi bi-trash-fill"></i>
              <div id="price">459 kr</div>
            </div>
          </div>
          <div class="boxItemsDark">
            <div class="contentBox">
              <img src="assets/img/basketboll.jpg" alt="Ball" />
              Basketboll

              <div id="counter-label">0</div>
              <div class="counter">
                <i class="bi bi-plus" id="plusClick"></i>
                <i class="bi bi-dash" id="minusClick"> </i>
              </div>

              <i class="bi bi-trash-fill"></i>
              <div id="price">459 kr</div>
            </div>
          </div>
          <div class="boxItemsLight">
            <div class="contentBox">
              <img src="assets/img/basketboll.jpg" alt="Ball" />
              Basketboll
              <div id="counter-label">0</div>
              <div class="counter">
                <i class="bi bi-plus" id="plusClick"></i>
                <i class="bi bi-dash" id="minusClick"> </i>
              </div>

              <i class="bi bi-trash-fill"></i>
              <div id="price">459 kr</div>
            </div>
          </div> 
          <div class="totalPrice">
            <p>Totalt: 10 000 kr</p>
          </div>

          <button type="button" class="btn btn-success" id="checkoutBtn">
            Till kassan
          </button>
        </div>
      </div>`;
  rootElement.appendChild(cartContainer);

  var counterVal = 0;
  var trash = document.getElementsByClassName("bi bi-trash-fill");

  function updateDisplay(val) {
    document.getElementById("counter-label").innerHTML = val;
  }

  document.getElementById("plusClick").addEventListener("click", function () {
    updateDisplay(++counterVal);
  });

  document.getElementById("minusClick").addEventListener("click", function () {
    if (counterVal > 0) {
      updateDisplay(--counterVal);
    }
  });

  for (i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", function () {
      console.log("Denna vara har raderats från din varukorg");
    });
  }

  document.getElementById("checkoutBtn").addEventListener("click", function () {
    console.log("Dags för dig att börja hosta upp slantar!");
  });

  document.getElementById("closeBox").addEventListener("click", function () {
    console.log("Rutan har nu blivit kryssad!");
  });
});

// Frank //

// DANIEL //

const printArticles = () => {
  const cardContainer = document.createElement("div");
  cardContainer.className = "myCards";

  articles.forEach((article) => {
    const card = `<div class="card text-center" style="width: 16rem; margin-top: 5%;">
    <div class="img-container">
    <img class="card-img-top" src="${article.img}" alt="Card image cap">
        </div>
        <div class="card-body">
          <h4 class="card-title">${article.title}</h4>
          <p class="card-text">${article.color}</p>
          <p class="card-text">${article.price}<span>:-</span></p>
  
          <button type="button" class="btn btn-warning" data-product-id="${article.productId}" data-bs-toggle="modal"
        data-bs-target="#exampleModal">
      Läs mer
    </button>
          
        </div>
        </div>`;
    const ele = document.createElement("div");
    ele.innerHTML = card;
    cardContainer.appendChild(ele);
    // document.getElementById("root").appendChild(ele);
  });
  document.getElementById("root").appendChild(cardContainer);

  Array.from(document.querySelectorAll(".btn-warning")).forEach((btn) =>
    btn.addEventListener("click", showModal)
  );
};

const printWelcome = () => {
  /* Den här tömmer root, tar  bort även modal-html */
  /* rootElement.innerHTML = ''; */

  /* Vi gör såhär ist: kollar om basket finns i root, om ja, tar bort den */
  const basket = rootElement.querySelector(".basket");
  basket && basket.parentNode.removeChild(basket);

  const ele = document.createElement("div");
  ele.className = 'welcome';

  const welcome = `<h1>Vad behöver du för boll idag?</h1>
    <p>
      Vi på BOLL kan bollar! Oavsett om du vill kicka boll, slå ner käglor
      eller slå boll med racket har vi det du behöver. Välkommen till vår
      webshop och ett oändligt utbud av bollar i alla tänkbara former!
    </p>
    <div class="ball-icons">
      <img class="first-icons" src="assets/img/bollariconer.jpg" alt="balls on a row" />
      <img class="second-icons" src="assets/img/bollariconer.jpg" alt="balls on a row" />
    </div>`;
  ele.innerHTML = welcome;
  document.getElementById("root").appendChild(ele);
};

document.querySelector(".all-articles").addEventListener("click", init);
document.querySelector(".logo").addEventListener("click", init);

function init() {
  printWelcome();
  printArticles();
}

init();
// DANIEL //
