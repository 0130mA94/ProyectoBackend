import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true , max: 100},
    price: {type: Number},
    admin: {type: Boolean, default: false},
    stock: {type: Number}
});

mongoose.model("Productos", ProductSchema);

export const ProductModel = mongoose.model("Productos", ProductSchema);