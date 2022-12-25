const express = require('express');
const Productos = require("./Productos")

const productos = new Productos();
const router = express.Router();

router.get("/", (_req,res) => {
    res.render('pages/form',{});
})

router.post("/products", (req,res) => {
    productos.crear(req.body);
    res.redirect('/');
})

module.exports = router;