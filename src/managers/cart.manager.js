import fs from "fs";
import { __dirname } from "../utils.js"
import ProductManager from "./productManager.js";

const productManager = new ProductManager();
const pathFile = __dirname + "/../carts.json"

export default class CartManager {
    constructor() {
        this.path = pathFile;
    }

    async getCart() {
    try {
            if (fs.existsSync(this.path)) {
                const cart = await fs.promises.readFile(pathFile, "utf8");
                const cartJS = JSON.parse(cart);
                return cartJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    async createCart() {
        try {
            const cartsFile = await this.getCart();
            const cart = {
                id: this.#getMaxId() + 1,
                products: []
            }
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
    #getMaxId(){
        return 1
    }

    async saveProductToCart(idCart, idProduct) {
        const cartsFile = await this.getCart();
        const cartExist = await this.getCartById(Number(idCart));
        const cartIndex = cartsFile.findIndex(cart => cart.id === idCart)
        const productExistsinJson = await productManager.getProductById(Number(idProduct));
        if(productExistsinJson){
            if(cartExist) {
                const productExistsCart = cartExist.products.find(prod => prod.id === idProduct);
                const productIndex = cartExist.products.findIndex(prod => prod.id === idProduct);
                if(productExistsCart){
                    cartExist.products[productIndex].quantity++
                } else {
                    const prod = {
                        id: idProduct,
                        quantity: 1
                    }
                    cartExist.products.push(prod);
                }
                cartsFile[cartIndex] = cartExist
                await fs.promises.writeFile(pathFile, JSON.stringify(cartsFile));
                return cartExist
            } else {
                throw new Error( "carrito no encontrado");
            }
        } else {
            throw new Error( "producto no encontrado");
        }
    }
};

