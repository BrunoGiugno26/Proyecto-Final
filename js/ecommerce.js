// Funcionamiento del html ecommerce

// Para abrir y cerrar el carrito

const carIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const CloseCart = document.querySelector("#cart-close");

// Creo los eventos para que funcionen

carIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

CloseCart.addEventListener("click",() =>{
    cart.classList.remove("active");
})

// Le voy a dar la orden cuando el documento este listo a travez de los condicionales

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded",start);
}else{
    start();
}

// Comenzar

function start(){
    addEvents()
}

// Actualizar y volver a Presentar

function update(){
    addEvents();
    updateToal();
}

// Eventos en funcion al añadido o borrado de los productos
function addEvents(){
    // Quitar articulos del carrito

    let cartRemove_btns = document.querySelectorAll(".cart-remove")

    console.log(cartRemove_btns);

    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });


// Cambiar cantidad de Articulos

let cartQuantity_inputs = document.querySelector(".cart-quantity")

cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change",handle_changeItemQuantity);
});

// Añadir Articulos al Carrito

let addCart_btns = document.querySelectorAll(".add-cart");

addCart_btns.forEach((btn) =>{
    btn.addEventListener("click",handle_addCartItem);
});
}