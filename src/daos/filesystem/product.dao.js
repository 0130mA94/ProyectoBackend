
import { __dirname } from "../utils.js";
const pathFile = __dirname + "/../products.json";

export default class ProductDaoFS {
    constructor(path) {
        this.path = path; 
    }
    async createProduct(obj) {
        try {
            const product = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const productsFile = await this.get();
            productsFile.push(product)
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }
    }
    async #getMaxId() {
        let maxId = 0;
        const products = await this.getAll();
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


    async getAll() {
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
            const productsFile = await this.get();
            const product = productsFile.find((p) => p.id === id);
            if (product) return product;
            else return false; 
        } catch (error) {
            console.log(error);
        }
    }
    async updateProduct(newProduct, id) {
        try {
            const productsFile = await this.get();
            const oldProduct = await this.getById(id);
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
            const productsFile = await this.get();
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

}
