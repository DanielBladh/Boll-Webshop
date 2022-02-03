//Hämtar artiklarna från databasen
const articles = JSON.parse(localStorage.bollar);

//Hämtar referens till root-element
const rootElement = document.querySelector("#root");

// LINA //

// Funktion showModal
// Deklarerar products till localstorage
function showModal() {
  const products = JSON.parse(localStorage.getItem("bollar"));
  // Deklarerar selectProductId till null så den inte har något värde från början
  let selectedProductId = null;

  // Deklarerar exampleModal till id exampleModal
  let exampleModal = document.getElementById("exampleModal");
  //Lägger till eventListener till show-bs-modal som uppstår när modalen är på väg att visa
  exampleModal.addEventListener("show.bs.modal", function (event) {
    selectedProductId = event.relatedTarget.getAttribute("data-product-id"); //rad 55
    document.getElementById("buyBtn").dataset.id = selectedProductId;
    // Gör en foreach för varje produkt och hårdkodar värdena
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
  // Funktion som sätter text från databasen till html elemenet
  function setProductData(value, product) {
    document.getElementById(value).innerHTML = product[value];
  }
  // Funktion som sätter bild från databasen till html elemenet
  function setProductImg(value, product) {
    document.getElementById(value).src = product[value];
  }
  // Deklarerar btn till id buyBtn
  const btn = document.getElementById("buyBtn");
  // Lägger på eventlistener på köp knappen
  btn.addEventListener("click", (e) => addToCart(e.target.dataset.id));
  // Hittar produkten för den produkt man tryckt på
  const product = articles.find(
    (article) => article.productId === Number(selectedProductId)
  );

  // If sats om inte cartArray innehåller produkt står texten Lägg till i varukorg på knappen
  if (!cartArray.includes(product)) {
    btn.textContent = "Lägg till i varukorg";
    // Annars Tillagd i varukorgen
  } else {
    btn.textContent = "Tillagd i varukorgen";
  }
}
// LINA //

// ----------------Frank--------------------//

//cartArray fylls med produkterna som ska in i varukorgen
var cartArray = [];

//Initierar alla variabler som kommer användas senare
var cartItemsElement = "";
var i = cartArray.length;
var counterElement = "";

//Lägger till varorna i varukorgen
function addToCart(id) {
  const btn = document.getElementById("buyBtn");
  const product = articles.find((article) => article.productId === Number(id));

  //Säkerställer att inga dubletter läggs in i varukorgen genom en enkel if-sats
  if (!cartArray.includes(product)) {
    btn.textContent = "Lägg till i varukorg";
    cartArray.push(product);
    product.quantity = 1;
  } else if (cartArray.includes(product)) {
    //Ändrar text när man lägger till i varukorg. Visuell bekräftelse
    btn.textContent = "Tillagd i varukorgen";
  }
}

//Tove
//Raderar varan från varukorgen och uppdaterar totala summan
function deleteFromCart(id) {
  // hittar index på produkten som ska raderas
  const index = cartArray.findIndex((item) => item.productId === Number(id));
  // återställer atribut hos produkten
  cartArray[index].quantity = 1;
  cartArray[index].cartSum = cartArray[index].price;

  // raderar produkten ur cart-array
  cartArray.splice(index, 1);
  deleteFromUI(id);

  if (cartArray.length === 0) {
    document.querySelector(
      ".cart-holder"
    ).innerHTML = `<p class="cart-message">Din varukorg är tom, du kommer nu att skickas tillbaka till startsidan!</p>`;

    setTimeout(() => {
      init();
    }, 3000);
  }
}

//Raderar varan från varukorgen, tar bort från html
function deleteFromUI(id) {
  // raderar varan i DOMen
  document
    .getElementById(id)
    .parentNode.removeChild(document.getElementById(id));

  //räkna om totalpris
  document.querySelector(".total-sum").innerHTML = `${totalPrice(
    cartArray
  )} kr`;
}

//Frank
//Varukorg knappen
document.getElementById("bag").addEventListener("click", function () {
  rootElement.innerHTML = "";

  renderCartItems();

  //Säkerställer att man inte kan gå in på varukorgen när den är tom
  if (cartArray.length == 0) {
    alert(
      "Din varukorg är tom. Vänligen lägg till varor i varukorgen för att kunna granska dem."
    );
    init();
  } else {
    openCart();
  }
});

//Renderar varukorgen med produkterna du lagt till index.html
function renderCartItems() {
  cartItemsElement = "";

  //forEach-loop som renderar varje artikel som pushats in i "cartArray"
  cartArray.forEach(
    (element) =>
      (cartItemsElement += `
      <div class="contentBox" id="${element.productId}">
        <div class="left">
            <div class="cart-img-container">
            <img src="${element.img}" alt="${element.title}" />
          </div>
          <p class="cart-title">${element.title} </p>
          <div class="counter-items">
            <div class="counter-label">${element.quantity}</div>
            <div class="counter">
              <i class="bi bi-plus plus"></i>
              <i class="bi bi-dash minus"> </i>
            </div>
          </div>
        </div>
      <div class="right">
        <i class="bi bi-trash-fill"></i>
        <div class="price">${element.price} kr</div>
      </div>
    </div>`)
  );
}

//Öppnar varukorgen med produkterna du lagt till
function openCart() {
  if (cartArray.length !== 0) {
    var sum = totalPrice(cartArray);
  }

  //Skapar alla HTML-element som renderas i index.html
  const cartContainer = document.createElement("div");
  cartContainer.className = "basket";

  cartContainer.innerHTML =
    `
  <div class="box">
    <i class="bi bi-x-lg" id="closeBox"></i>
    <div class="cart-holder">` +
    // "cartItemsElement" som vi fyllt med html:en för alla produkter används här
    cartItemsElement +
    `</div>
    <div class="bottom">
      <div class="totalPrice">
        <p>Totalt: <span class="total-sum">${totalPrice(
          cartArray
        )} kr</span></p>
      </div>

      <button type="button" class="btn btn-success" id="checkoutBtn">
        Till kassan
      </button>
    </div>
  </div>`;
  rootElement.appendChild(cartContainer);

  //Lägger till en eventListener till alla knappar i varukorgen
  var trash = document.getElementsByClassName("bi bi-trash-fill");

  //Uppdaterar värdet för antalet varor i varukorgen, dvs siffran
  function updateDisplay(id, quantity, price) {
    const product = document.getElementById(id);
    product.querySelector(".counter-label").innerHTML = quantity;
    product.querySelector(".price").innerHTML = `${price} kr`;
    document.querySelector(".total-sum").innerHTML = `${totalPrice(
      cartArray
    )} kr`;
  }

  const plusBtns = Array.from(document.querySelectorAll(".plus"));

  //Unika plus-knappar för varje produkt för att öka antalet
  // av en produkt i varukorgen
  plusBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // hitta id på produkten
      id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      // hitta produkten i varukorgs array
      const product = cartArray.find(
        (article) => article.productId === Number(id)
      );

      // uppdatera produktattribut
      product.quantity++;
      product.cartSum += product.price;

      // Uppdatera DOMen
      updateDisplay(id, product.quantity, product.cartSum);
    });
  });

  const minusBtns = Array.from(document.querySelectorAll(".minus"));

  //Unika minus-knappar för varje produkt för att minus antalet
  // av en produkt i varukorgen
  minusBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // hitta id på produkten
      id = e.target.parentNode.parentNode.parentNode.parentNode.id;
      // hitta produkten i varukorgs array
      const product = cartArray.find(
        (article) => article.productId === Number(id)
      );

      //Minska bara antalet om det är fler än 1
      if (product.quantity > 1) {
        // uppdatera produktattribut
        product.quantity--;
        product.cartSum -= product.price;

        // Uppdatera DOMen
        updateDisplay(id, product.quantity, product.cartSum);
      }
    });
  });

  //En "radera"-knapp för varje artikel
  for (i = 0; i < trash.length; i++) {
    trash[i].addEventListener("click", function (e) {
      deleteFromCart(e.target.parentNode.parentNode.id);
    });
  }

  //Alert för "Till kassan"-knappen
  document.getElementById("checkoutBtn").addEventListener("click", function () {
    alert("Du har nu beställt varorna i din varukorg! :)");
  });

  //Stänger rutan och tar dig till startsidan när du trycker på krysset i varukorgen
  document.getElementById("closeBox").addEventListener("click", function () {
    init();
  });
}

// ----------------Frank--------------------//

// DANIEL //

// Skapar en forEach-loop som loopar igenom databasen och sedan skapar upp card-artiklar. //
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

// En funktion som skriver ut välkomstmeddelande //
const printWelcome = () => {
  // skapa div
  const ele = document.createElement("div");
  ele.className = "welcome";

  // lägg in välkomstmeddelande
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
  // lägg ut i DOMen
  document.getElementById("root").appendChild(ele);
};

// Lägg till modalen i DOMen så att den senare kan anropas mvid knapp-tryck
function addModalHTML() {
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
              <p class="mt-5 fs-4 fw-bold text-end"> Pris:<span id="price"></span>kr</p>
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

//  Sökfunktion med "keyup"-funktion. Skapar en variabel som sparar ner filtrerade artiklar.
const searchBar = document.getElementById("search");

search.addEventListener("keyup", (e) => {
  document.getElementById("root").innerHTML = "";

  addModalHTML();
  showModal();
  const searchString = e.target.value.toLowerCase();
  // If-sats som skriver ut alla artiklar igen om sökfältet är tomt - annars skriv ut filteredArticles //
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

// forEach-loop som skriver ut artiklarna som har filtrerats från sökfunktionen. //

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

// Funktion som räknar ut totala priset i varukorgen. //
function totalPrice(articles) {
  var sum = 0;
  articles.forEach((article) => {
    sum += article.cartSum;
  });
  return sum;
}
// DANIEL //

document.querySelector(".all-articles").addEventListener("click", init);
document.querySelector(".logo").addEventListener("click", init);

function init() {
  rootElement.innerHTML = "";
  printWelcome();
  printArticles();
  addModalHTML();
  showModal();
}

init();
