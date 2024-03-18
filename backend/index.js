require('dotenv').config();

const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const UID = require('uid-safe');
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

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(session({
    genid: (req) => {
        return UID.sync(18);
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }
}));

app.use(express.json());

app.use('/api', routes);

app.listen(3008, () => {
    console.log(`Server Started at ${3008}`)
})