import express from "express";
import productRouter from "./routes/products.router.js";
import {dirname} from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
const __dirname = dirname (fileURLToPath (import.meta.url));
//console.log(__dirname);

const app = express();

app.use(express.static( __dirname + "/public")); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("./products.json",productRouter);


const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server ok on port ${PORT}`);
});

