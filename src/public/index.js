const socketClient = io ();

socketClient.on("testMessage", (message) =>{
    console.log(message);

    socketClient.emit("respuestaDesdeElFront", "Muchas gracias")
} )