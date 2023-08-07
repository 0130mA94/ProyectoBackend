import { CartModel } from "./models/cart.model.js";
//import { ProductModel } from "./models/product.model.js";

export default class CartDaoMongoDB {
    async getAll (){
        try {
            const response = await CartModel.find({});
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async getProductById (id){
        try {
            const response = await CartModel.findById(id);
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async createProduct (obj){
        try {
            const response = await CartModel.create(obj);
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async updateProduct(id, obj){
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {new: true}); 
            return response;
        } catch (error){
            console.log(error);
        }
    }
    async deleteProduct(id){
        try {
            const response = await CartModel.findByIdAndDelete(id);
            return response;
        } catch (error){
            console.log(error);
        }
    }
}