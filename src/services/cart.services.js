import * as cartDao from "../daos/mongodb/cart.dao.js";
import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";


const prodDao = new ProductDaoMongoDB();

export const getAllService = async () => {
    try {
        const response = await cartDao.getAll();
        return response;  
    } catch (error){
        console.log(error);
    }
}

export const getById = async (id) => {
    try {
        const item = await cartDao.getProductById (id);
        if(!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}
export const addProductToCart = async (id, productId) => {
    try {
        const cart = await cartDao.getProductById(obj)
        const product = await prodDao.getById(productId);

        if(!product) throw new Error("Product not found");
        if(!cart) throw new Error ("Cart not found");

        const newCart = await cartDao.addProductToCart(id,productId);
        if (!newCart) return false;
        else return newProd;
    } catch (error){
        console.log(error);
    }
}
export const updateCartItems = async (id, obj) => {
    try {
        const products = await productDao.getAll();
    const productsIds = products.map((product) => product._id.toString());
    const itemsIds = items.map((item) => item.product.toString());
    const productsExist = itemsIds.every((id) => productsIds.includes(id));
    if (!productsExist) throw new Error("Product not found");
        const item = await cartDao.update(id, obj)
        return item;
    } catch (error){
        console.log(error);
    }
}
export const updateProductQuantity = async (id, productId, quantity) => {
    try {
      const cart = await cartDao.getById(id);
      const product = await productDao.getById(productId);
  
      if (!product) throw new Error("Product not found");
      if (!cart) throw new Error("Cart not found");
  
      const updatedCart = await cartDao.updateProductQuantity(
        id,
        productId,
        quantity
      );
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };



  export const removeProducts = async (id) => {
    try {
      const cart = await cartDao.getById(id);
  
      if (!cart) throw new Error("Cart not found");
  
      const updatedCart = await cartDao.removeProducts(id);
      return updatedCart;
    } catch (error) {
      console.log(error);
    }
  };