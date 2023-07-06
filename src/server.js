import express from "express";
import productRouter from "./routes/products.router.js";
import {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cartRouter from "./routes/cart.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
const __dirname = dirname (fileURLToPath (import.meta.url));
//console.log(__dirname);

const app = express();
//app.use(express.static( __dirname + "/public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use('/api/products', productRouter);
app.use("/api/cart", cartRouter);
const PORT = 8080;
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars");
app.engine ("handlebars", handlebars.engine());
app.get("/", (req, res) => {
    res.render("websockets")
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server ok on port ${PORT}`);
});

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
})