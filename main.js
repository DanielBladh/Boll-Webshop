const articles = JSON.parse(localStorage.bollar);


// LINA //
let exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', function (event) {
    let product = event.relatedTarget
    let productid = product.getAttribute('data-product-id'); //rad 56
    products = JSON.parse(localStorage.getItem('bollar')); // från T´s lista

    products.forEach(product => {
        if (product.productId == productid) {
            console.log(product.title);
            setProductData("title", product)
            setProductData("price", product)
            setProductData("extraEquipment", product)
            setProductData("material", product)
            setProductData("color", product)
            setProductData("level", product)
        }

    });
})
function setProductData(value, product) {
    document.getElementById(value).innerHTML = product[value]
}