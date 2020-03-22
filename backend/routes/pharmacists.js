const router = require('express').Router();
let Pharmacist = require('../models/pharmacists.model');


router.route('/').get((req, res) =>{
    Pharmacist.find()
        .then(pharmacists => res.json(pharmacists)) //return json
        .catch(err => res.status(400).json('Error get all: ' +err)); //or error
});

router.route('/add').post((req, res) =>{
    const email = req.body.email;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;

    const newPharmacist = new Pharmacist({
        email,
        firstname,
        lastname,
        password,
    });

    newPharmacist.save()
        .then(()=> res.json('Pharmacist added'))
        .catch(err => res.status(400).json('Error save: ' +err)); //or error
    });

    router.route('/:id').get((req, res) =>{
        Pharmacist.findById(req.params.id)
            .then(pharmacist => res.json(pharmacist)) //return json
            .catch(err => res.status(400).json('Error get Id: ' +err)); //or error
    });

    router.route('/:id').delete((req, res) =>{
        Pharmacist.findByIdAndDelete(req.params.id)
            .then(pharmacist => res.json('Pharmacist deleted')) //return json
            .catch(err => res.status(400).json('Error delete: ' +err)); //or error
    });

module.exports = router;