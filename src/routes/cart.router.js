import { Router } from "express";
import CartManager from "../managers/cart.manager.js";


const cartManager = new CartManager()
const router = Router();

router.post ( "/", async (req, res) => {
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
});

export default router;