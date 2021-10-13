const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compression = require('compression')
const utils = require('./utils/utils')

const domainRouter = require('./routes/api');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())

for (let url of utils.getRouterJson()) {
    utils.getCache().put(url, "")
}

app.use('/', domainRouter);


module.exports = app;
