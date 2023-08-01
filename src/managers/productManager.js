import fs from "fs";
import { __dirname } from "../utils.js";
import { ProductModel } from "../db/schema.js";
const pathFile = __dirname + "/../products.json";

export default class ProductManager {
    constructor() {
        this.model = model; 
    }
    async createProduct(obj) {
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const productsFile = await this.getProduct();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    async #getMaxId() {
        let maxId = 0;
        const products = await this.getAllProducts();
        products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }
    async getProduct() {
        try {
            if (fs.existsSync(this.path)) {
                const product = await fs.promises.readFile(this.path, "utf8");
                const productJS = JSON.parse(product);
                return productJS;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }


    async getAllProducts() {
        try {
            if (fs.existsSync(pathFile)) {
                const products = await fs.promises.readFile(pathFile, "utf8");
                const productsJSON = JSON.parse(products);
                return productsJSON;
            }else {
                console.log('else')
                return[];
            }

        }catch (error){
            console.log(error);
        }
    };
    async getProductById(id) {
        try {
            const productsFile = await this.getProduct();
            const product = productsFile.find((p) => p.id === id);
            if (product) return product;
            else return false; 
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(newProduct, id) {
        try {
            const productsFile = await this.getProduct();
            const oldProduct = await this.getProductById(id);
            const index = productsFile.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error("id not found");
            } else {
                productsFile[index] = {...oldProduct ,...newProduct }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            console.log(error);
        }
    }
    async deleteProduct(id) {
        try {
            const productsFile = await this.getProduct();
            if (productsFile.length > 0) {
                const newProducts = productsFile.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
                return newProducts;
            } else {
                throw new Error("Product not found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async deleteAllProducts () {
        try {
            if (fs.existsSync(pathFile)) {
                await fs.promises.unlink(pathFile)
            }
        } catch (error){
            console.log(error);
        }
    }
}


