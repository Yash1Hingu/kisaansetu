const { fetchProduct, createProduct, updateProduct, deleteProduct } = require('./api.js');

describe('Positive Test Cases', () => {
    let productId;

    test('fetches successfully data from Kisaan Setu API', async () => {

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

        expect(response.status).toBe(201);
    })

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
    })

    test('delete product successfully to kisaan setu API', async () => {

        const response = await deleteProduct(`http://localhost:3000/api/products/${productId}`);

        // Status Code.
        expect(response.status).toEqual(200);

        // Data is in json formate.
        expect(response.headers['content-type']).toContain('application/json');

        // Check Filled's Exist.
        const data = response.data.product;

        // check contains fields
        expect(data).toHaveProperty('title');
        expect(data).toHaveProperty('price');
        expect(data).toHaveProperty('weight');

        // types of fileds
        expect(typeof data.title).toBe('string');
        expect(typeof data.price).toBe('number');
        expect(typeof data.verified).toBe('boolean');
    })
});
