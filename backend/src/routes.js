const { Router } = require('express');
const DevController = require('./controllers/DevController');

const routes = Router();

// Post request to Dev's API - Register a Dev
routes.post('/devs', DevController.store);

module.exports = routes;
