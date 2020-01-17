const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

// Post request to Dev's API - Register a Dev
routes.post('/devs', DevController.store);
// Get request to Dev's API - List all Devs
routes.get('/devs', DevController.index);

// Get request to Search's API - List all Devs in a 10km range
routes.get('/search', SearchController.index);

module.exports = routes;
