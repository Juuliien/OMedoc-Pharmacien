const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema ({
    name: {type: String, required: true},
    description:{type: String, required: true},
    imageUrl: {type: String, required: true},
    totalDownloads: {type: Number, required: true},
    updatedAt: {type: String, required: true}
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;