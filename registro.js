import { initMongoDB } from "./connection.js";
import { ProductModel } from "./schema.js";

const product = {
    name: "Detective Comics",
    price: 20 ,
    stock: 30
}

const createProduct = async (obj) => {
    await ProductModel.create(obj);
}

const test = async () => {
    await initMongoDB();
    await createProduct(product);
    console.log("producto creado")
}

test()