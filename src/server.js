import express from "express";
import productRouter from "./routes/products.router.js";
import {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import cartRouter from "./routes/cart.router.js";
//import cart from "./routes/cart.router.js";
const __dirname = dirname (fileURLToPath (import.meta.url));
//console.log(__dirname);

const app = express();

app.use(express.static( __dirname + "/public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
//app.use("./products.json",productRouter);
app.use('/products', productRouter);
app.use("/cart", cartRouter);
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server ok on port ${PORT}`);
});

