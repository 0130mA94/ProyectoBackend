import * as service from "../services/cart.services.js"  

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAllService();
        res. status(200).json(response);
    } catch (error){
        next(error.message); 
    }
};

export const getById =  async (req, res, next) => {
    try {
        const {id} = req.params;
        const prod = await service.getById(id);
        if(!prod) res.status(404).json({msg: "Product not found"});
        else res.json(prod);
    } catch (error){
        next(error.message); 
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.createService(req.body);
        if (!newProd) res.status(404).json({msg: "Validation Error"});
        else res.json(newProd);
    } catch (error){
        next(error.message)
    }
};

export const update = async (req, res, next) => {
    try {
        const prodUpd= await service.update(id, obj);
        return prodUpd;
    } catch (error){
        next(error.message)
    }
};

export const remove = async (req, res, next) => {
    try {
        const {id}= req.params;
        const prodDel = await service.remove(id);
        res.json(prodDel);
        } catch (error){
        next(error.message)
    }
};