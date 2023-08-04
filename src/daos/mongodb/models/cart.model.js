import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String},
    price: { type: Number, required: true},
    stock: { type: Number, required: true}
});
export const CartModel = mongoose.model("Cart", CartSchema);