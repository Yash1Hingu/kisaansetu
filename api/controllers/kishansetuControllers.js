'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('products');

exports.list_all_products = (req, res) => {

    let query = {};

    if (req.query.price) {
        query.price = req.query.price;
    }

    if (req.query.maxPrice && req.query.minPrice) {
        query.price = { $gte: req.query.minPrice, $lte: req.query.maxPrice }
    }

    if (req.query.category) {
        query.category = req.query.category;
    }


    Product.find(query)
        .then(product => {
            if (product.length > 0) {
                res.json(product);
            } else {
                res.status(404).json({ message: "no product found" });
            }
        })
        .catch(err => res.send({ message: err.message }));
};

exports.create_a_product = (req, res) => {
    let new_product = new Product(req.body);

    new_product.save()
        .then(product => res.status(201).json(product))
        .catch(err => res.status(400).send({ message: err.message }));
};

exports.read_a_product = (req, res) => {
    Product.findById(req.params.productId)
        .then(product => {
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "product not found" });
            }
        })
        .catch(err => res.send({ message: err.message }));
};

exports.update_a_product = (req, res) => {
    Product.findOneAndUpdate({ _id: req.params.productId }, req.body, { new: true })
        .then(product => {
            if(product){
                res.json(product);
            } else {
                res.status(404).send({message: 'product not exits'});
            }
        })
        .catch(err => res.status(400).send(err));
};

exports.delete_a_product = (req, res) => {
    Product.findByIdAndDelete(req.params.productId)
        .then(product => {
            if (product) {
                res.status(200).json({ message: 'product successfully deleted', product });
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        })
        .catch(err => res.status(400).send(err));
};