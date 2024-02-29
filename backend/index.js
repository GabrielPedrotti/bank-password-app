require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const { DB_CONNECTION_STRING } = process.env;

mongoose.connect(DB_CONNECTION_STRING);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());

app.use('/api', routes);

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})