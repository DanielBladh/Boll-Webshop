const articles = JSON.parse(localStorage.bollar);

// LINA //
let exampleModal = document.getElementById("exampleModal");
exampleModal.addEventListener("show.bs.modal", function (event) {
  let product = event.relatedTarget;
  let productid = product.getAttribute("data-product-id"); //rad 56
  products = JSON.parse(localStorage.getItem("bollar")); // från T´s lista

  products.forEach((product) => {
    if (product.productId == productid) {
      console.log(product.title);
      setProductData("title", product);
      setProductData("price", product);
      setProductData("extraEquipment", product);
      setProductData("material", product);
      setProductData("color", product);
      setProductData("level", product);
    }
  });
});
function setProductData(value, product) {
  document.getElementById(value).innerHTML = product[value];
}
// LINA //

// Frank //

/* Lägg till kvantitet på vara */
var counterVal = 0;
var trash = document.getElementsByClassName("bi bi-trash-fill");

/* Bara en knapp (den översta) funkar */
var plus = document.getElementById("plusClick");
var minus = document.getElementById("minusClick");
var counter = document.getElementById("counter-label");

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
/* */

/* Soptunna + "Till kassan" + Kryssa rutan */

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

// Frank //
