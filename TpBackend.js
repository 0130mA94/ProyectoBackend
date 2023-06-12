const fs = require("fs");



class productManager {
    #nextId = 1;
    constructor(path) {
        this.path = path
        this.products = [];

    }

    _getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id > maxId) maxId = product.id;
        });
        return maxId;
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productsjs = JSON.parse(products);
                return productsjs;
            } else {
                return []
            }
        }
        catch
        (error) {
            console.log(error);
        }

    }

    async createProduct(product) {
        try {
            const productsFile = await this.getProducts();
            product.id = this.#nextId;
            this.#nextId++;
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            console.log(error);
        }

    }
    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

}

const manager = new productManager("./products.json");

const product1 = {
    name: "Batman: Año uno",
    version: "Black Label",
    price: 12,
    editorial: "DC",
    image: "./Img/BatmanAñoUno.jpg",
    stock: 20,
    code: "125DC",
    id: 1
}

const product2 = {
    name: "Batman: La corte de los búhos",
    version: "Black Label",
    price: 9.99,
    editorial: "DC",
    image: "./Img/LaCorteDelosBuhos.webp",
    stock: 20,
    code: "123DC",
    id: 2
}

const test = async () => {
    const getProducts = await manager.getProducts()
    console.log("primera compra: ", getProducts);
    await manager.createProduct(product1);
    const getProducts2 = await manager.getProducts()
    console.log("segunda compra: ", getProducts2);
    await manager.createProduct(product2);
    const getProducts3 = await manager.getProducts()
    console.log("tercera compra: ", getProducts3);

    const productId = 2;
    await manager.getProducts();
    const product = manager.getProductById(productId);
    console.log(`Producto con ID ${productId}:`, product);

}

test()




//     addProduct(title, description, price, thumbnail, code, stock) {
//         const checkProduct = this.#getProduct(code)
//         if (!checkProduct) {
//             const product = {
//                 id: this.#getMaxId() + 1,
//                 code,
//                 title,
//                 description,
//                 price,
//                 thumbnail,
//                 stock
//             };
//             this.products.push(product);
//             console.log(`Producto ${code} creado`)
//             return `Producto ${code} creado`
//         } else {
//             console.log(`El producto ya existe`)
//         }
//     }

//     #getMaxId() {
//         let maxId = 0;
//         this.products.map((product) => {
//             if (product.id < maxId) maxId = product.id;
//         })
//         return maxId;
//     }
//     #getProduct(idProduct) {
//         return this.products.find(product => product.id === idProduct);
//     }
// }
// const manager = new productManager()


// manager.addProduct("Batman: Año uno", "DC black label", 9.99, "./Img/BatmanAñoUno.jpg","DC123", 10);
// manager.addProduct("Batman: La corte de los búhos", "DC black label", 25, "./Img/LaCorteDeLosBuhos.wep","DC125", 15 )
// console.log(manager.addProduct);

// manager.getProducts();





