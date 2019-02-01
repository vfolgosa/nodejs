const express = require('express')
const bodyParser = require('body-parser');

const app = express()

app.use(bodyParser.json());

const planetsController = require('./controller');

//
// routes
app.get('/planets', planetsController.getAll);
app.get('/planets/:planetId', planetsController.getOne);
app.post('/planets', planetsController.create);
app.delete('/planets/:planetId', planetsController.delete);


module.exports = app