import fs from "fs";
import { __dirname } from "../utils.js"
const router = __dirname + "../carts.json"


export default class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async getCart() {
    try {
            if (fs.existsSync(this.path)) {
                const cart = await fs.promises.readFile(this.path, "utf8");
                const cartJS = JSON.parse(cart);
                return cartJS;
            } else {Cart
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const cart = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const cartsFile = await this.getCart();
            cartsFile.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(cartsFile));
            return cart;
        } catch (error) {
            console.log(error);
        }
    }
    async getCartById(id) {
        try {
            const CartsFile = await this.getCart();
            const cart = CartsFile.find((p) => p.id === id);
            if (cart) return cart;
            else return false; 
        } catch (error) {
            console.log(error);
        }
    }
};

export const saveProductToCart = async (idCart, idProduct) => {
    const cartsFile = await this.getCart();
    const cartExist = await getCartById(idCart);
    const productExistsinJson = await getProductById(idProduct);
    if(productExists){
        if(cartExist) {
            const productExistsCart = cartExist.products.find(prod => prod.id === idProduct);
            if(productExistsCart){
                productExistsCart.quantity +1
            } else {
                const prod = {
                    id: idProduct,
                    quantity: 1
                }
                cartExist.products.push(prod);
            }
            await fs.promises.writeFile(pathFile, Json.stringify(cartsFile));
            return cartExist
        }
    } else {
        throw new Error( "producto no encontrado");
    }
}