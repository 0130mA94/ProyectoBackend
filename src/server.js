import express from "express";
import ProductManager from "./managers/productManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./products.json");


app.get("/products", async (req, res) => {
    try {
        const products = await productManager.getProduct();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.get("/search", async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productManager.getProductById(Number(id));
        if (product) {
            res.json(product)
        } else {
            res.status(400).json({ message: "qué tas buscando? busca mejor amigo" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post("/products", async (req, res) => {
    //console.log(req.body);
    try {
        const { title, description, price, editorial } = req.body;
        const product = {
            title,
            description,
            price,
            editorial,
        }
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
app.put("/products/:idProduct", async (req, res) => {
    try {
        const product = req.body;
        const { idProduct } = req.params;
        const idNumber = parseInt(idProduct);
        const productExist = await productManager.getProductByID(parseInt(idProduct));
        if (productExist) {
            await productManager.updateProduct(product, idNumber);
            res.json({ message: `Product id: ${idNumber} updated` })
        } else {
            res.status(400).json({ message: `Product id: ${idNumber} Not found` })
        }
    } catch (error) {
        console.log(error)
    }
});

app.delete("/products/:productId", (req, res) => {
    try{

    }catch{
        res.status(500).json({ message: error.message });
    }
})

app.listen(8080, () => {
    console.log("Server ok on port 8080");
});