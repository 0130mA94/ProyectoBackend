export const fieldsValidator = (req, res, next) => {
    const { title, description, price, stock, code, category } = req.body;
    const isValid = validateFields(title, description, price, stock, code, category )
    const isNumberPrice = isNumber(price)
    if(isValid) res.status(400).json({ message: 'All fields are required'})
    else if(isNumberPrice) res.status(400).json({ message: 'Price debe ser numero' })
    else next ();
}

const validateFields = (title, description, price, stock, code, category) => !title || !description || !code || !price || !stock || !category
const isNumber = (price) => {
    if(typeof price === 'number') return false
    else return true
}