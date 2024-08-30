const axios = require('axios');
const qs = require('qs');

async function fetchProduct(url) {
    const response = await axios.get(url);
    return response;
}

async function createProduct(url, productData) {

    productData = qs.stringify(productData);

    const response = await axios.post(url, productData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })

    return response;
}

async function updateProduct(url, productData) {

    productData = qs.stringify(productData);

    const response = await axios.put(url, productData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });

    return response;
}

async function deleteProduct(url) {
    
    const response = await axios.delete(url);

    return response;
}

module.exports = { fetchProduct, createProduct, updateProduct, deleteProduct };