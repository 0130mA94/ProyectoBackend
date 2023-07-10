const socketClient = io ();

socketClient.on("testMessage", (message) =>{
    console.log(message);

    socketClient.emit("respuestaDesdeElFront", "Muchas gracias")
    console.log("Hola")
} )

const form = document.getElementById("form");
const inputName = document.getElementById("name");
const inputPrice = document.getElementById ("price");
const products = document.getElementById("products");


form.onsubmit = (e) => {
    const name = inputName.value;
    const price = inputPrice.value;
    socketClient.emit("newProduct", {name, price});
}

socketClient.on("arrayProducts", (array) => {
    let infoProducts = "";
   array.forEach((prod) => {
        infoProducts += `${prod.name} - ${prod.price} </br>` 
       
    });
    products.innerHTML = infoProducts
})