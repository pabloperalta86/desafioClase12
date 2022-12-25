const express = require('express');
const Contenedor = require("./Contenedor")

const productos = new Contenedor("productos.json");
const router = express.Router();

router.get("/", (_req,res) => {
    res.render('pages/form',{});
})

router.post("/products", (req,res) => {
    productos.save(req.body);
    res.redirect('/');
})

module.exports = router;