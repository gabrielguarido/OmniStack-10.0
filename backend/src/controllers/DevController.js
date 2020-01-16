const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    // Register a dev
    async store (request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        // Verifying if the Dev already exists
        let dev = await Dev.findOne({ github_username });

        if (!dev) {
            // Using Git Hub API to get Dev's info by username
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = techs.split(',').map(tech => tech.trim());

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };

            // Persisting Dev's information in database
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });

            return response.json(dev);
        }

        return response.json({
            message: 'User already exists!'
        });
    }
};
