import { initMongoDB } from "./connection.js";
import { ProductModel } from "./schema.js";

const test = async () => {
    await initMongoDB();
    const consulta1 = await ProductModel.find ({})
    console.log(consulta1);
}

test();