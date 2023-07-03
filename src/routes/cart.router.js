import { Router } from "express";
import router from "./products.router.js";
const cartRouter = Router ();


router.post ( "/", async (req, res) => {
    const newCart = await productManager.createCart(cart);
    res.json(newCart);
})

router.post("/:idCart/product/:idProduct", async (req, res) =>{
    try {
        const { title, description, price, editorial, role } = req.body;
        const cart= {
            title,
            description,
            price,
            editorial,
            role
        }
        const newCart = await productManager.createProduct(cart);
        res.json(newCart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
export default cartRouter;