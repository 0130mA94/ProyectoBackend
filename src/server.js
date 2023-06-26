import express from "express";
import productRouter from "./routes/products.router.js";

const app = express();

//app.use(express.static("src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products",productRouter);

app.listen(8080, () => {
    console.log("Server ok on port 8080");
});