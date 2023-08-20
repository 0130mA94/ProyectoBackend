import { Router } from "express";
const router = Router();
import { __dirname } from "../utils.js";
import getProductById from "../managers/productManager.js";
import {
  login,
  register,
  errorLogin,
  errorRegister,
  profile,
} from "../controllers/views.controllers.js";
router.get("/", (req, res) => {
  res.render("form");
});

router.get("/login", login);
router.get("/register", register);
router.get("/error-login", errorLogin);
router.get("/error-register", errorRegister);
router.get("/profile", profile);

/*router.get('/home/:id', async(req, res) => {
    const { idProduct } = req.params;
    const product = await getProductById(Number(idProduct));
    res.render('home', { product});
});*/

export default router;
