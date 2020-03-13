const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Create express server
const app = express();
const port = process.env.PORT || 5000;

//Cors middleware and parse JSON
app.use(cors());
app.use(express.json());

//const uri = process.env.ATLAS_URI;
const uri = 'mongodb+srv://cynaye:cynaye@cluster0-oq7yu.gcp.mongodb.net/test';
mongoose.connect(uri, {
    useNewUrlParser: true, 
    useCreateIndex: true
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