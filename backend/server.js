const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const secret = process.env['SECRET'];

require('dotenv').config();

//Create express server
const app = express();
const port = process.env.PORT || 5000;

//Cors middleware and parse JSON
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_CONNECTION;
//const uri = 'mongodb+srv://cynaye:cynaye@cluster-ppe-mbpz6.mongodb.net/test?retryWrites=true&w=majority';
//const uri = 'mongodb+srv://cynaye:cynaye@cluster0-38xs5.mongodb.net/test?retryWrites=true&w=majority';//mine


mongoose.connect(uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established succesfully");
})

const productsRouter = require('./routes/products');

app.use('/products', productsRouter);

//Start server
app.listen(port, () =>{
    console.log(`Server is listening on port : ${port}`);
});