import { Router } from "express";
const router = Router();
import { __dirname } from "../utils.js";
import  getProductById  from "../managers/productManager.js";

router.get('/', (req, res) => {
    res.render('form')
});

/*router.get('/home/:id', async(req, res) => {
    const { idProduct } = req.params;
    const product = await getProductById(Number(idProduct));
    res.render('home', { product});
});*/

export default router