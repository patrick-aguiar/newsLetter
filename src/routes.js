const express = require('express');
const newsletterRoute = require('./modules/newsletter-post');
const indexRoute = require('./modules/pages/page-index-get');
const errorRoute = require('./modules/pages/page-error-post');

const routes = express.Router();

routes.post('/newsletter', newsletterRoute);
routes.post('/failure', errorRoute);
routes.get('/', indexRoute);


module.exports = routes;