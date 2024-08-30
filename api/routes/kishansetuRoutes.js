'use strict';
const express = require('express');
const productList = require('../controllers/kishansetuControllers');

const router = new express.Router();

// productList Routes
router.get('/products', productList.list_all_products);
router.post('/products', productList.create_a_product);

// product Routes
router.get('/products/:productId', productList.read_a_product);
router.put('/products/:productId', productList.update_a_product);
router.delete('/products/:productId', productList.delete_a_product);


module.exports = router;