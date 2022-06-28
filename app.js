const express = require('express');

const ariesRouter = require('./api-routes/routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', ariesRouter);

module.exports = app;