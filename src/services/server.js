import express from "express";
import productRouter from "../routes/products.router.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cartRouter from "../routes/cart.router.js";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "../routes/views.router.js";
import loginRouter from "../routes/login.router.js";
import { errorHandler } from "../middlewares/errorHandler.js";
import "../daos/mongodb/connection.js";
import cookieParser from "cookie-parser";
import { __dirname, mongoStoreOptions } from "../utils.js";
import { createHash } from "crypto";
import userRouter from "../routes/user.router.js";
import passport from "passport";
import "../passport/local-strategy.js";
import "../passport/github-strategy.js";
import session from "express-session";

//const __dirname = dirname (fileURLToPath (import.meta.url));

const cookieKey = "1234";
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(errorHandler);
app.use(cookieParser(cookieKey));
app.use(session(mongoStoreOptions));
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.initialize());
app.use(passport.session());
app.use("/users", userRouter);
app.use("/login", loginRouter);
app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
const PORT = 8080;

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.engine("handlebars", handlebars.engine());
app.get("/realTimeProducts", (req, res) => {
  res.render("websockets");
});
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server ok on port ${PORT}`);
});

const products = [];

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  //console.log(`Usuario conectado: ${socket.id}`);

  socket.on("disconnect", () => {
    //console.log("Usuario desconectado");
  });

  socket.emit("testMessage", "mensaje de prueba");

  socket.on("respuestaDesdeElFront", (message) => {
    //console.log(message);
  });

  socket.on("newProduct", (obj) => {
    products.push(obj);
    socketServer.emit("arrayProducts", products);
  });
});
