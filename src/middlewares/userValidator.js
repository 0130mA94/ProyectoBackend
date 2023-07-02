export const userValidator = (req, res, next) => {
    const product = req.body;
    if(product.role === "admin") next ();
    else res.status(401).send ("no estas habilitado");
}