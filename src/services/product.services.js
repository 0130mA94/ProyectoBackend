import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
const prodDao = new ProductDaoMongoDB();

export const getAllService = async (limit, page) => {
    try {
        const response = await prodDao.getAll();
        return response;  
    } catch (error){
        console.log(error);
    }
}



export const getById = async (id) => {
    try {
        const item = await prodDao.getProductById (id);
        if(!item) return false;
        else return item;
    } catch (error) {
        console.log(error);
    }
}
export const createService = async (obj) => {
    try {
        const newProd = await prodDao.createProduct(obj)
        if (!newProd) return false;
        else return newProd;
    } catch (error){
        console.log(error);
    }
}
export const updateService = async (id, obj) => {
    try {
        const item = await prodDao.update(id, obj)
        return item;
    } catch (error){
        console.log(error);
    }
}
export const remove = async (id) => {
    try {
        const item = await prodDao.deleteProduct(id)
        return item;
    } catch (error){
        console.log(error);
    }
}