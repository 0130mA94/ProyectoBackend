import express  from "express";
import productManager from "./managers/productManager.js";

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const productManager =  new ProductManager("./products.json");


app.get("/products", async(req, res) => {
    try{
        const products = await productManager.getProducts();
        res.status(200).json(products);
    } catch{
        res.status(404).json({message: error.message});
    }
})

app.listen(8080, () => {
    console.log("Server ok on port 8080");
})