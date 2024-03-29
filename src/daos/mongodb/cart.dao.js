import { CartModel } from "./models/cart.model.js";
import { ProductModel } from "./models/product.model.js";

export const getAll = async () => {
  try {
    const response = await CartModel.find();
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (id) => {
  try {
    const response = await CartModel.findById(id).populate(items.product);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (obj) => {
  try {
    const response = await CartModel.create({ obj: [] });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const product = await ProductModel.findById(productId);
    const cart = await CartModel.findById(id);
    const productInCart = cart.items.find(
      (item) => item.product._id.toString() === product._id.toString()
    );

    if (productInCart) productInCart.quantity++;
    else
      cart.items.push({
        product,
        quantity: 1,
      });

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
export const updateCartItems = async (id, items) => {
  try {
    const cart = await CartModel.findById(id);
    cart.items = items;
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProductQuantity = async (id, productId, quantity) => {
  try {
    const cart = await CartModel.findById(id);
    const productInCart = cart.items.find(
      (item) => item.product._id.toString() === productId
    );

    if (productInCart) productInCart.quantity = quantity;
    else throw new Error("Product not found in cart");

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
export const removeProducts = async (id) => {
  try {
    const cart = await CartModel.findByIdAndUpdate(
      id,
      { items: [] },
      { new: true }
    );
    return cart;
  } catch (error) {
    console.log(error);
  }
};
