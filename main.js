const articles = JSON.parse(localStorage.bollar);
const rootElement = document.querySelector("#root");

// LINA //

// Modalen
function showModal() {
  const products = JSON.parse(localStorage.getItem("bollar")); // från Toves lista
  let exampleModal = document.getElementById("exampleModal");
  exampleModal.addEventListener("show.bs.modal", function (event) {
    let selectedProductId = event.relatedTarget.getAttribute("data-product-id"); //rad 55
    document.getElementById("buyBtn").dataset.id = selectedProductId;
    console.log(selectedProductId);

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
  // Köp Knappen med click funktion
  document
    .getElementById("buyBtn")
    .addEventListener("click", (e) => addToCart(e.target.dataset.id));
}
// LINA //

// ----------------Frank--------------------//

/* Lägg till antal bollar knappen! */

//Denna array fylls med produkterna som ska in i varukorgen
var cartArray = [];
var cartItemsElement = "";
var i = cartArray.length;

function addToCart(id) {
  const product = articles.find((article) => article.productId === Number(id));
  console.log(product);
  if (!cartArray.includes(product)) {
    console.log("Nu har du lagt till en basketboll i din varukorg!");
    // "articles[0]" är basketbollen.
    cartArray.push(product);
    //Ser till så att man inte kan lägga till samma artikel 2 ggr.
  } else if (cartArray.includes(product)) {
    console.log("Denna vara finns redan i din varukorg.");
  }
}

/* document.getElementById("cartTestBtn").addEventListener("click", function () {
  if (!cartArray.includes(articles[0])) {
    console.log("Nu har du lagt till en basketboll i din varukorg!");
    // "articles[0]" är basketbollen.
    cartArray.push(articles[0]);
    //Ser till så att man inte kan lägga till samma artikel 2 ggr.
  } else if (cartArray.includes(articles[0])) {
    console.log("Denna vara finns redan i din varukorg.");
  }
});

document.getElementById("cartTestBtn2").addEventListener("click", function () {
  if (!cartArray.includes(articles[1])) {
    console.log("Nu har du lagt till en baseball i din varukorg!");
    // "articles[1]" är baseball.
    cartArray.push(articles[1]);
  } else if (cartArray.includes(articles[1])) {
    console.log("Denna vara finns redan i din varukorg.");
  }
}); */

document.getElementById("bag").addEventListener("click", function () {
  const welcome = rootElement.querySelector(".welcome");
  const cardDiv = rootElement.querySelector(".myCards");
  const cart = document.querySelector(".basket");

  if (welcome && cardDiv) {
    welcome.parentNode.removeChild(welcome);
    cardDiv.parentNode.removeChild(cardDiv);
  }

  if (!cart) {
    renderCartItems();

    if (cartArray.length == 0) {
      alert("Din varukorg är tom");
      init();
    } else {
      openCart();
    }
  }
});

// Visar varukorgen med produkterna du lagt till
function renderCartItems() {
  cartArray.forEach(
    (element) =>
      (cartItemsElement += `
      <div class="boxItemsDark">
      <div class="contentBox">
      <img src="${element.img}" alt="${element.title}" />
      <p>${element.title} </p>
      <div id="counter-label">0</div>
      <div class="counter">
      <i class="bi bi-plus" id="plusClick"></i>
      <i class="bi bi-dash" id="minusClick"> </i>
      </div>
      <i class="bi bi-trash-fill"></i>
      <div id="price">${element.price} kr</div>
      </div>
      </div>`)
  );
}

//Öppnar varukorgen med produkterna du lagt till
function openCart() {
  const cartContainer = document.createElement("div");
  cartContainer.className = "basket";
  cartContainer.innerHTML =
    `
        <div class="box">
        <i class="bi bi-x-lg" id="closeBox"></i>` +
    cartItemsElement +
    `<div class="totalPrice">
            <p>Totalt: 60 kr </p>
          </div>

          <button type="button" class="btn btn-success" id="checkoutBtn">
            Till kassan
          </button>
        </div>
      </div>`;
  rootElement.appendChild(cartContainer);

  //Lägger till en eventListener till alla knappar i varukorgen
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
    alert("Du har nu beställt varorna i din varukorg! :)");
  });

  /* Stänger rutan och tar dig till startsidan när du trycker på krysset i varukorgen */
  document.getElementById("closeBox").addEventListener("click", function () {
    init();
  });
}

// ----------------Frank--------------------//

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
  });
  document.getElementById("root").appendChild(cardContainer);

  Array.from(document.querySelectorAll(".btn-warning")).forEach((btn) =>
    btn.addEventListener("click", showModal)
  );
};

const printWelcome = () => {
  const ele = document.createElement("div");
  ele.className = "welcome";

  const welcome = `<h1>Vad behöver du för boll idag?</h1>
    <p>
      Vi på BOLL kan bollar! Oavsett om du vill kicka boll, slå ner käglor
      eller slå boll med racket har vi det du behöver. Välkommen till vår
      webshop och ett oändligt utbud av bollar i alla tänkbara former!
    </p>
    <div class="ball-icons">
      <img src="assets/img/bollariconer.jpg" alt="balls on a row" />
      <img src="assets/img/bollariconer.jpg" alt="balls on a row" />
    </div>`;
  ele.innerHTML = welcome;
  document.getElementById("root").appendChild(ele);
};

document.querySelector(".all-articles").addEventListener("click", init);
document.querySelector(".logo").addEventListener("click", init);

function init() {
  rootElement.innerHTML = "";
  printWelcome();
  printArticles();
  const modal = document.createElement("div");
  modal.innerHTML = `<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body p-5 d-lg-flex justify-content-center">
          <img id="img" class="p-5 w-100 w-lg-50" src="" alt="Ball Picture">
          <!-- Här nedanför kommer Titeln på produktvaran  -->
          <div class="w-lg-50 mt-5">
            <div class="text-center">
              <h1 class="modal-title p-2 rounded-3" id="title"></h1>
            </div>
            <div class="">
              <!-- Här kallas produkterna-->
              <div class="productInfo bg-purple p-3 mt-5 rounded-3">
                <p class="fs-6">Säljs separat: <span class="fw-bold" id="extraEquipment"></span></p>
                <p class="fs-6">Material: <span class="fw-bold" id="material"></span></p>
                <p class="fs-6">Färg: <span class="fw-bold" id="color"></span></p>
                <p class="fs-6">Nivå: <span class="fw-bold" id="level"></span></p>
                <p class="fs-6">Kategori: <span class="fw-bold" id="category"></span></p>
              </div>
              <p class="mt-5 fs-4 fw-bold text-end">Pris: <span id="price"></span>:-</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" id="buyBtn" class="btn btn-success btn-lg">KÖP</button>
        </div>
      </div>
    </div>
  </div>`;
  document.getElementById("root").appendChild(modal);
}

init();

// DANIEL //
const searchBar = document.getElementById("search");

search.addEventListener("keyup", (e) => {
  document.getElementById("root").innerHTML = "";
  const searchString = e.target.value.toLowerCase();

  if (searchString === "") {
    init();
  } else {
    const filteredArticles = articles.filter((article) => {
      return (
        article.title.toLowerCase().includes(searchString) ||
        article.color.toLowerCase().includes(searchString) ||
        article.material.toLowerCase().includes(searchString)
      );
    });
    displayResult(filteredArticles);
  }
});

search.addEventListener("search", () => {
  rootElement.innerHTML = "";
  init();
});

const displayResult = (articles) => {
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
};

showModal();

// DANIEL //
