import { Router } from "express";
import * as controller from "../controllers/product.controllers.js"
const router = Router();
import ProductManager from "../managers/productManager.js";
import { logUrl } from "../middlewares/logUrl.js";
import { fieldsValidator } from "../middlewares/fieldsValidator.js";

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

export default router;











/*const productManager = new ProductManager();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        if (limit) {
            res.send('hay limite')
        } else {
            const products = await productManager.getProduct();
            res.status(200).json(products);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const products = await productManager.getProductById(Number(idProduct));
        if (products) {
            res.json(products)
        } else {
            res.status(400).json({ message: "products not found" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.post("/", [logUrl, fieldsValidator], async (req, res) => {
    //console.log(req.body);
    try {
        const { title, description, price, stock, code, category, thumbnails = [], status = true } = req.body;
        const product = {
            title,
            description,
            price,
            stock,
            code,
            category,
            thumbnails,
            status
        }
        const newProduct = await productManager.createProduct(product);
        res.json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put("/:idProduct", async (req, res) => {
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

router.delete("/:idProduct", async (req, res) => {
    try {
        const { idProduct } = req.params;
        const newProducts= await productManager.deleteProduct(Number(idProduct))
        res.status(200).json(newProducts);

    } catch {
        res.status(500).json({ message: error.message });
    }
});

export default router;*/
