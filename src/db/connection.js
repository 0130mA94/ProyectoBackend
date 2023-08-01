import mongoose from "mongoose";

const connectionString =  "mongodb://127.0.0.1:27017/Ecommerce";
//export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("conectado a MongoDB")
    } catch (error){
        console.log(error);

    }
//}

