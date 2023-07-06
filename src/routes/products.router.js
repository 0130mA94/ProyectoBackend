import { Router } from "express";
const router = Router();
import ProductManager from "../managers/productManager.js";
import { userValidator } from "../middlewares/userValidator.js";
import { logUrl } from "../middlewares/logUrl.js";


const productManager = new ProductManager("./products.json");

router.get('/', async(req, res)=>{
    try {
       const products = await productManager.getProduct();
       res.status(200).json(products); 
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
router.get("/", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const products = await productManager.getProductById(Number(id));
        res.status(200).json(products);
        if (products) {
            res.json(products)
        } else {
            res.status(400).json({ message: "products not found" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post("/", [logUrl, userValidator], async (req, res) => {
    //console.log(req.body);
    try {
        const { title, description, price, editorial, role } = req.body;
        const product = {
            title,
            description,
            price,
            editorial,
            role
        }
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/", async (req, res) => {
    try {
        const product = req.body;
        const { idProduct } = req.params;
        const idNumber = parseInt(idProduct);
        const productExist = await productManager.getProductById(parseInt(idProduct));
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

router.delete("/", (req, res) => {
    try{

    }catch{
        res.status(500).json({ message: error.message });
    }
});

export default router;
