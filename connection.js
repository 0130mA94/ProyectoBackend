import mongoose from "mongoose";

const connectionString = "mongodb://localhost:27017/Ecommerce";

export const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log("conectado a MongoDB")
    } catch (error){
        console.log(error);

    }
}