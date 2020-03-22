const router = require('express').Router();
let Pharmacy = require('../models/pharmacies.model');


router.route('/').get((req, res) =>{
    Pharmacy.find()
        .then(pharmacy => res.json(pharmacy)) //return json
        .catch(err => res.status(400).json('Error get all: ' +err)); //or error
});

router.route('/add').post((req, res) =>{
    const name = req.body.name;
    const address = req.body.address;

    const newPharmacy = new Pharmacy({
        name,
        address,
    });

    newPharmacy.save()
        .then(()=> res.json('Pharmacy added'))
        .catch(err => res.status(400).json('Error save: ' +err)); //or error
    });

    router.route('/:id').get((req, res) =>{
        Pharmacy.findById(req.params.id)
            .then(pharmacy => res.json(pharmacy)) //return json
            .catch(err => res.status(400).json('Error get Id: ' +err)); //or error
    });

    router.route('/:id').delete((req, res) =>{
        Pharmacy.findByIdAndDelete(req.params.id)
            .then(pharmacy => res.json('Pharmacy deleted')) //return json
            .catch(err => res.status(400).json('Error delete: ' +err)); //or error
    });

module.exports = router;