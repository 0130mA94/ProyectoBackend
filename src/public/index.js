import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();



const sessionConfig = {
    secret: "secret",
    cookie:{maxAge: 1000},
    saveUnitialized: true,
    resave: false
};

app.use(session(sessionConfig));

const users = [
    {
        username: "Carlos",
        email: "adminCoder@coder.com",
        password: 1234,
        admin: true

    }
];

app.post("/login", (req, res) => {
    const {username, password, email } = req.body;
    const index = users.findIndex((user) => user.username === username && user.password === password)
    if (index < 0 ) res.json({msg: "Unauthorized"})
    else {
const user = users[index];
req.session.info = {
    loggedIn: true,
    count: 1,
    admin: user.admin
}
res.json({msg:`Bienvenido ${user.username}` })
}
})
const mySecretKey = "1234"

app.use(cookieParser(mySecretKey));

app.get("/set-cookie", (req, res) => {
    res.cookie("idioma", "español", 
    //{maxAge: 3000}
    ).send("ok");
});


app.get("/get-cookie", (req, res) => {
console.log(req.cookies);
const {idioma} =(req.cookies);
idioma === "ingles" ?res.send ("Hello") : res.send("Hola");
});

app.get("/set-signed-cookie", (req, res) => {
    res.cookie("name","Roberto" , {maxAge: 3000}, {signed: true}).send("ok");
});

app.get("/get-signed-cookie", (req, res) => {
    res.json({
        cookies: req.cookies.idioma,
        signedCookies : req.signedCookies
    });
});

app.get("/clear", (req, res) => {
    const cookies = req.cookies;
    //console.log(cookies);
    const keys = Object.keys(cookies);
    keys.forEach((key) => res.clearCookie(key));
    res.send("cookies clear");
    //res.clearCookie("idioma").send("clear cookie");
})
app.listen(8080, () => {
    console.log("server ok");
})

/*const socketClient = io (); 

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
})*/