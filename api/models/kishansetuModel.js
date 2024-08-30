'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    category: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('products',ProductSchema);