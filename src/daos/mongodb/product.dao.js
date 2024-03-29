import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    async getAll (limit = 0, skip = 0){
        try {
            const response = await ProductModel.find({}).skip(skip).limit(limit);
            return response;
        } catch (error){
            console.log(error); 
        }
    }
    async getProductById (id){
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async createProduct (obj){
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async updateProduct(id, obj){
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {new: true}); 
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error){
            console.log(error);
        }
    }
}