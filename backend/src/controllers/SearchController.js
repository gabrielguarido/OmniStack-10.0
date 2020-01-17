const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    // List all Devs in a 10km range and filter by technologies
    async index (request, response) {
        const { latitude, longitude, techs } = request.query;

        const techsArray = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
              $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [ longitude, latitude ],
                    },
                    // Setting max distance to 10.000 m (10 km)
                    $maxDistance: 10000
                },
            },
        });

        return response.json({ devs });
    }
};
