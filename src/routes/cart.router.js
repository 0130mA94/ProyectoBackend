router.post ( "/", async (req, res) => {
    const newCart = await productManager.createCart(cart);
    res.json(newCart);
})

router.post("/:idCart/product/:idProduct", (req, res) =>{
        
} )