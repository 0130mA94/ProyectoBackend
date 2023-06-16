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
                this.products = productsjs
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
    todosLosProductos() {
         if (!product.title || !product.description || !price || !thumbnail || !code || !stock) {
            console.log("El producto está incompleto.");
        } return true;
    }
    async createProduct(product) {
        try {
            const productsFile = await this.getProducts();
            let codeExists = this.products.some((element) => {
                return element.code === product.code;
            });
            if (codeExists) {
                console.log("producto existente");
                return;
            }
            if (todosLosCampos && !codeExists) {
                const newProduct = {
                    id: this.#nextId,
                    title: product.title,
                    description: product.description,
                    price: product.price,
                    editorial: product.editorial,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    code: product.code
                }
                productsFile.push(newProduct);
                this.#nextId++;
                await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
                return newProduct;

            }
        } catch (error) {
            console.log(error);
        }

    }
    async getProductById(id) {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productsjs = JSON.parse(products);
                const product = productsjs.find((product) => product.id === id);
                return product || null;
            } else {
                return null;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async updateProduct(id, updated) {
        try {
            await this.getProducts();
            let index = this.products.findIndex((Element) => {
                return Element.id === id;
            });
            if (updated.code) {
                let codeExists = false;
                codeExists = this.products.some((item) => item.code === updated.code);
                if (!codeExists) {
                    let modifiedProducts = {
                        ...this.products[index],
                        ...updated
                    }
                    this.products[index] = modifiedProducts;
                    this.saveProducts(this.products);

                } else {
                    console.log("Este producto ya existe");
                    return;
                }
            } else {
                let modifiedProducts = {
                    ...this.products[index],
                    ...updated
                }
                this.products[index] = modifiedProducts;
                this.saveProducts(this.products);

            }

        } catch (error) {
            console.log(error);
        }


    }
    async deleteProduct(id) {
        try {
            await this.getProducts();

            if (this.products.some(element => element.id === id)) {
                let index = this.products.findIndex((element) => {
                    return element.id === id;
                });

                this.products.splice(index, 1);
                await fs.promises.writeFile(this.path, JSON.stringify(this.products));
                return;
            } else {
                console.log("este producto no existe");
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveProducts(elements) {
        try {
            const productsJS = JSON.stringify(elements);
            await fs.promises.writeFile(this.path, productsJS);
        } catch (error) {
            console.log(error);
        }
    }
}



const manager = new productManager("./products.json");

const product1 = {

    title: "Batman: Año uno",
    description: "Black Label",
    price: 12,
    editorial: "DC",
    thumbnail: "./Img/BatmanAñoUno.jpg",
    stock: 20,
    code: "125DC"
}

const product2 = {

    title: "Batman: La corte de los búhos",
    description: "Black Label",
    price: 9.99,
    editorial: "DC",
    thumbnail: "./Img/LaCorteDelosBuhos.webp",
    stock: 20,
    code: "123DC"

}

const test = async () => {
    await manager.createProduct(product1)
    await manager.createProduct(product2)
    await manager.updateProduct(2, product2Modify)
    const product = await manager.getProductById(2);
    console.log(product);
    //const getProducts = await manager.getProducts()
    //console.log("primera compra: ", getProductsById(1));
    //await manager.createProduct(product1);
    // const getProducts2 = await manager.getProducts()
    // console.log("segunda compra: ", getProducts2);
    // await manager.createProduct(product2);
    // const getProducts3 = await manager.getProducts()
    // console.log("tercera compra: ", getProducts3);
const productIdDelete = 1;
await manager.deleteProduct(productIdDelete);
console.log("producto eliminado con exito")
const productsAfterDelete = await manager.getProducts();
console.log("productos despues de eliminar: ", productsAfterDelete);
}

const testDeleteProduct = async () => {
    const productsBeforeDelete = await manager.getProducts();
    console.log("productos antes de eliminar", productsBeforeDelete);
    const productIdDelete = 1;
    await manager.deleteProduct(productIdDelete);
    console.log("producto eliminado con exito");

    const productsAfterDelete = await manager.getProducts();
    console.log("productos despues de eliminar: ", productsAfterDelete)
};



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





