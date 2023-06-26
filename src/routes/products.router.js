import { Router } from "express";
const router = Router();
import ProductManager from "../managers/productManager.js";
const productManager = new ProductManager("./products.json");

router.get("/search", async (req, res) => {
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

router.post("/", async (req, res) => {
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
router.put("/:idProduct", async (req, res) => {
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

router.delete("/:productId", (req, res) => {
    try{

    }catch{
        res.status(500).json({ message: error.message });
    }
});

export default router;
