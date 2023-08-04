import { Router } from "express";
//import CartManager from "../managers/cart.manager.js";
import * as controller from "../controllers/cart.cotrollers.js"

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/api/carts/:cid/products/:pid", controller.update);
router.put("/api/carts/:cid", controller.update);

router.delete("/api/carts/:cid/products/:pid", controller.remove);












export default router;














/*router.post ( "/", async (req, res) => {
    const newCart = await cartManager.createCart();
    res.json(newCart);
})

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params
        const cart = await cartManager.getCartById(Number(cid))
        if(cart) {
            res.status(200).json(cart)
        } else {
            res.status(404).json({ message: 'Cart not found'})
        }
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

router.post("/:idCart/product/:idProduct", async (req, res) =>{
    try {
        const { idCart, idProduct } = req.params
        const cart = await cartManager.saveProductToCart(Number(idCart), Number(idProduct))
        res.status(200).json(cart);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});*/
