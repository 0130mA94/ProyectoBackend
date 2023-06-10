class productManager {
    #nextId = 1;
    constructor() {
        this.products = [];

    }
    addProduct(title, description, price, thumbnail, code, stock) {
        const checkProduct = this.#getProduct(code)
        if (!checkProduct) {
            const product = {
                id: this.#getMaxId() + 1,
                code,
                title,
                description,
                price,
                thumbnail,
                stock
            };
            this.products.push(product);
            console.log(`Producto ${code} creado`)
            return `Producto ${code} creado`
        } else {
            console.log(`El producto ya existe`)
        }
    }

    #getMaxId() {
        let maxId = 0;
        this.products.map((product) => {
            if (product.id < maxId) maxId = product.id;
        })
        return maxId;
    }
    getProducts() {
        return this.products;
    }
    #getProduct(idProduct) {
        return this.products.find(product => product.id === idProduct);
    }
}
const manager = new productManager()


manager.addProduct("Batman: Año uno", "DC black label", 9.99, "./Img/BatmanAñoUno.jpg","DC123", 10);
manager.addProduct("Batman: La corte de los búhos", "DC black label", 25, "./Img/LaCorteDeLosBuhos.wep","DC125", 15 )
console.log(manager.addProduct);

manager.getProducts();

