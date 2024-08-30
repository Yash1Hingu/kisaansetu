require('dotenv').config();
const express = require('express');
app = express();
port = process.env.PORT || 3000;


const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/kisaansetudummyDb';
Product = require('./api/models/kishansetuModel');


// Connnect mongoose instance
mongoose.connect(uri).then(res => {
    console.log("DB Connected!")
}).catch(err => {
    console.log(Error, err.message);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Importing Routes
const productRouter = require('./api/routes/kishansetuRoutes');

// Register the routes
app.use('/api', productRouter);

app.get('*', (req, res) => {
    res.status(404).send({ url: req.originalUrl + 'not found' });
})

app.listen(port, () => {
    console.log('Kisaan Setu API server started on: ' + port);
});
