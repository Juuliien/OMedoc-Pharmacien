const router = require('express').Router();
let Product = require('../models/products.model');

router.route('/').get((req, res) =>{
    Product.find()
        .then(products => res.json(products)) //return json
        .catch(err => res.status(400).json('Error get all: ' +err)); //or error
});

router.route('/add').post((req, res) =>{
    const name = req.body.name;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    const price = Number(req.body.price);

    const newProduct = new Product({
        name,
        description,
        imageUrl,
        price,
    });

    newProduct.save()
        .then(()=> res.json('Product added'))
        .catch(err => res.status(400).json('Error save: ' +err)); //or error
    });

    router.route('/:id').get((req, res) =>{
        Product.findById(req.params.id)
            .then(products => res.json(products)) //return json
            .catch(err => res.status(400).json('Error get Id: ' +err)); //or error
    });

    router.route('/:id').delete((req, res) =>{
        Product.findByIdAndDelete(req.params.id)
            .then(products => res.json('Product deleted')) //return json
            .catch(err => res.status(400).json('Error delete: ' +err)); //or error
    });

module.exports = router;