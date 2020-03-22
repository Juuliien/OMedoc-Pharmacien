const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistSchema = new Schema ({
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    password:{type: String, required: true},
});

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);

module.exports = Pharmacist;