const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacySchema = new Schema ({
    name: {type: String, required: true},
    address: {type: String, required: true},
});

const Pharmacy = mongoose.model('Pharmacy', pharmacySchema);

module.exports = Pharmacy;