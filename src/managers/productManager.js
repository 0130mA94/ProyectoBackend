import fs from "fs";
import { Router } from "express";
import { __dirname } from "../utils.js";
const router = Router();

const products = [];
export default class ProductManager {
    constructor(path) {
        this.path = path;
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
        const products = await this.getProduct();
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
    async updateProduct(obj, id) {
        try {
            const productsFile = await this.getProduct();
            const index = productsFile.findIndex(product => product.id === id);
            if (index === -1) {
                throw new Error("id not found");
            } else {
                productsFile[index] = { ...obj, id }
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
                const newArray = productsFile.filter(product => product.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error("Product not found");
            }
        } catch (error) {
            console.log(error);
        }
    }
}

