//?Funcionamiento del carrito de compras en el archivo html ecommerce.html

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
    updateTotal();
}

// Eventos en funcion al añadido o borrado de los productos
function addEvents(){
    // Quitar articulos del carrito

    let cartRemove_btns = document.querySelectorAll(".cart-remove");

    console.log(cartRemove_btns);

    cartRemove_btns.forEach((btn) => {
        btn.addEventListener("click", handle_removeCartItem);
    });


// Cambiar cantidad de Articulos

let cartQuantity_inputs = document.querySelectorAll(".cart-quantity");

cartQuantity_inputs.forEach((input) => {
    input.addEventListener("change",handle_changeItemQuantity);
});

// Añadir Articulos al Carrito

let addCart_btns = document.querySelectorAll(".add-cart");

addCart_btns.forEach((btn) =>{
    btn.addEventListener("click",handle_addCartItem);
});
}

// Comprar Orden

const buy_btn = document.querySelector(".btn-buy");
buy_btn.addEventListener("click",handle_buyOrden);

// Ahora le doy funcionamiento al manejo de los eventos

let itemsAdded = [];

function handle_addCartItem(){
    let product = this.parentElement;
    let title = product.querySelector(".product-title").innerHTML;
    let price = product.querySelector(".product-price").innerHTML;
    let imgSrc = product.querySelector(".product-img").src;

    console.log(title,price,imgSrc);


    let newToAdd = {
        title,
        price,
        imgSrc,
    };

    // El elemento de manejo ya existente

    if(itemsAdded.find((el) => el.title == newToAdd.title)){
        alert("Este Articulo ya existe");
        return;
    }else{
        itemsAdded.push(newToAdd);
    }

    // Añadir Productos al carrito

    let cartBoxElement = cartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement("div");
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector(".cart-content");
    cartContent.appendChild(newNode);

    update();
}

function handle_removeCartItem(){
    this.parentElement.remove();

    itemsAded = itemsAded.filter(
        (el) =>
        el.title != this.parentElement.querySelector(".cart-product-title").innerHTML
    );

    update();
}

function handle_changeItemQuantity(){
    if(isNaN(this.value) || this.value < 1){
        this.value = 1;
    }
    this.value = Math.floor(this.value); // Para mantener el numero entero y no quede ne decimal

    update();
}

function handle_buyOrden(){
    if(itemsAdded.length <= 0){
        alert("Aun no hay ningun pedido para realizar! \nPor favor, haga un pedido primero");
        return;
    }

    const cartContent = cart.querySelector(".cart-content");
    cartContent.innerHTML = "";
    alert("Su pedido se realizo con exito :)");
    itemsAdded = [];
    update();
}

// Funciones de Actualizar y Renderizar

function updateTotal(){
    let cartBoxes = document.querySelectorAll(".cart-box");
    const totalElement = cart.querySelector(".total-price");
    let total = 0;

    cartBoxes.forEach((cartBox) =>{
        let priceElement = cartBox.querySelector(".cart-price");
        let price = parseFloat (priceElement.innerHTML.replace("$",""));
        let quantity = cartBox.querySelector(".cart-quantity").value;

        total += price * quantity;
    });

    total = total.toFixed(2);
    // Quiere decir que quiero mantener 2 digitos despues del punto decimal

    totalElement.innerHTML = "$" + total;
}

//  =========== Componentes HTML ============

function cartBoxComponent(title,price,imgSrc){
    return `
    <div class="cart-box">

    <img src=${imgSrc} alt ="" class="cart-img">

    <div class="detail-box">

    <div class ="cart-product-title">${title}</div>

    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">

    </div>

    <!___Eliminar cart ___>
    <i class="bx bxs-trash-alt cart-remove"></i>

    </div>
    `;
}

//?Funcionamiento del swiper del header del archivo ecommerce.html

var swiper = new Swiper (".myswiper-1",{
    slidesPerView:1,
    spaceBetween: 30,
    loop:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEl:".swiper-button-next",
        prevEl:".swiper-button-prev",
    }
});

//?Funcionamiento del formulario del archivo contact.html

const nombre = document.getElementById("name")
const email = document.getElementById("email")
const pass = document.getElementById("password")
const mensaje = document.getElementById("textarea")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <6){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!regexEmail.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(pass.value.length < 8){
        warnings += `La contraseña no es valida <br>`
        entrar = true
    }

    if(mensaje.value.length <3){
        warnings+= `El mensaje es muy corto`
        entrar = true
        alert("Por favor nos gustaria saber sus preferencias")
    }

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
    }
})