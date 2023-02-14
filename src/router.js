const express = require('express');
const Contenedor = require("./Contenedor");
const productosRandom = require('./faker.js');

const productos = new Contenedor("productos.json");
const router = express.Router();

router.get("/", (_req,res) => {
    res.render('pages/form',{});
})

router.post("/products", (req,res) => {
    productos.save(req.body);
    res.redirect('/');
})

router.get('/productos-test', async (req, res) => {
    try {
        const productosFaker = productosRandom();
        res.json(productosFaker);
    } catch (err) {
        res.status(500).send(`No se puede recuperar los datos ${err}`);
    }
});

module.exports = router;