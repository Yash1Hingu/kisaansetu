const qs = require('qs');
const { fetchProduct, createProduct, updateProduct, deleteProduct } = require('./api.js');

describe('Positive Test Cases', () => {
    let productId;
    let product;

    test('fetch successfully data from Kisaan Setu API', async () => {

        const response = await fetchProduct('http://localhost:3000/api/products');

        // Status Code.
        expect(response.status).toEqual(200);

        // Data is in json formate.
        expect(response.headers['content-type']).toContain('application/json');

        // Check Filled's Exist.
        const data = response.data;

        // data must be array.
        expect(Array.isArray(data)).toBe(true);

        data.forEach(item => {
            // check contains fields
            expect(item).toHaveProperty('title');
            expect(item).toHaveProperty('price');
            expect(item).toHaveProperty('weight');

            // types of fileds
            expect(typeof item.title).toBe('string');
            expect(typeof item.price).toBe('number');
            expect(typeof item.verified).toBe('boolean');
        })

    });

    test('create product successfully to kisaan setu API', async () => {

        const productData = {
            title: "Apple",
            subtitle: "Kasmir Apple",
            rating: 4,
            category: "fruit",
            verified: true,
            price: 80,
            weight: 0.5
        };

        const response = await createProduct('http://localhost:3000/api/products', productData);
        productId = response.data._id;
        product = response.data;

        expect(response.status).toBe(201);
    });

    test('fetch product by id successfully from kisaan setu API', async () => {

        const response = await fetchProduct(`http://localhost:3000/api/products/${productId}`);

        expect(response.status).toBe(200);

        const data = response.data;

        // check contains fields
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('weight');

        // types of fileds
        expect(typeof data.title).toBe('string');
        expect(typeof data.price).toBe('number');
        expect(typeof data.verified).toBe('boolean');
    });

    test('update product successfully to kisaan setu API', async () => {
        const productData = {
            title: "Apple",
            subtitle: "Golden Delicious Apple",
            rating: 4,
            category: "fruit",
            verified: true,
            price: 100,
            weight: 1
        };

        const response = await updateProduct(`http://localhost:3000/api/products/${productId}`, productData);

        // Status Code.
        expect(response.status).toEqual(200);

        // Data is in json formate.
        expect(response.headers['content-type']).toContain('application/json');

        // Check Filled's Exist.
        const data = response.data;

        // check contains fields
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('weight');

        // types of fileds
        expect(typeof data.title).toBe('string');
        expect(typeof data.price).toBe('number');
        expect(typeof data.verified).toBe('boolean');
    });

    test('delete product successfully to kisaan setu API', async () => {

        const response = await deleteProduct(`http://localhost:3000/api/products/${productId}`);

        // Status Code.
        expect(response.status).toEqual(200);

    });

    test('deleted product not accessible from kisaan setu API', async () => {

        try {
            const response = await fetchProduct(`http://localhost:3000/api/products/${productId}`);
        } catch (error) {
            expect(error.response.status).toBe(404);
        }
    });

});

describe('Negative Test Cases', () => {
    let invalidProductId = '123456789101112131415123';

    test('fails to fetch data from Kisaan Setu API with invalid URL', async () => {

        try {
            const response = await fetchProduct('http://localhost:3000/api/invalid-products');
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }

    })

    test('fails to create a product with missing required fields', async () => {
        const invalidProductData = {
            subtitle: "Kashmir Apple",  // Missing title, price, weight, etc.
            rating: 4,
            category: "fruit",
            verified: true
        };

        try {
            const response = await createProduct('http://localhost:3000/api/products', invalidProductData);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    })

    test('fails to create a product with invaild data types', async () => {
        const invalidProductData = {
            title: "Apple",
            subtitle: "Golden Delicious Apple",
            rating: "high",
            category: "fruit",
            verified: "yes",
            price: "eighty",
            weight: "half"
        };

        try {
            const response = await createProduct('http://localhost:3000/api/products', invalidProductData);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    })

    test('fails to update a product with an invalid product ID', async () => {
        const productData = {
            title: "Apple",
            subtitle: "Golden Delicious Apple",
            rating: 4,
            category: "fruit",
            verified: true,
            price: 100,
            weight: 1
        };

        try {
            const response = await updateProduct(`http://localhost:3000/api/products/${invalidProductId}`, productData);
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    })

    test('fails to update a product with an malformed product ID', async () => {
        const productData = {
            title: "Apple",
            subtitle: "Golden Delicious Apple",
            rating: 4,
            category: "fruit",
            verified: true,
            price: 100,
            weight: 1
        };

        const malformedProductId = 'invalid-id';

        try {
            const response = await updateProduct(`http://localhost:3000/api/products/${malformedProductId}`, productData);
        } catch (error) {
            expect(error.response.status).toEqual(400);
        }
    })

    test('fails to delete a product with an invaild product id', async () => {

        try {
            const response = await deleteProduct(`http://localhost:3000/api/products/${invalidProductId}`);
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    })

    test('fails to delete a product with malformed product ID', async () => {
        const malformedProductId = 'invalid-id';

        try {
            const response = await deleteProduct(`http://localhost:3000/api/products/${malformedProductId}`);
        } catch (error) {
            // Expect a 400 Bad Request error for malformed product ID
            expect(error.response.status).toEqual(400);
        }
    });

})
