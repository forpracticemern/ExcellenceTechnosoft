const express = require('express');
const app = express();
const port = 7777;
const { errors } = require('celebrate');

// To read the .env file
const dotenv = require('dotenv');
dotenv.config();

// For get and post request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static File
app.use(express.static('public'));

// Routes
app.use('/candidate', require('./routes/candidate'));

// Validation Error
app.use(errors());

// Server Started
const server = app.listen(process.env.PORT || port, () => {
	console.log('Server Started at ' + port);
});
