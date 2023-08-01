import { initMongoDB } from "./connection.js";
import { ProductModel } from "./schema.js";

const product = {
    name: "Detective Comics",
    price: 20 ,
    admin: true,
    stock: 30
}

const createProduct = async (obj) => {
    await ProductModel.create(obj);
}

const test = async () => {
   try {
       await initMongoDB();
       await createProduct(product);
    console.log("producto creado")
    } catch (error){
        console.log(error)
    }
    }
    
    
test();