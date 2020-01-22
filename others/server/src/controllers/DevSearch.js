// - rota de busca, longitude e latitude e filtro por techs
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    const { longitude, latitude, techs } = request.query;

    techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: {
        $in: parseStringAsArray(techs, true)
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    response.json({ devs });
  }
};
// * Buscar devs num raio de 10km
// * filtrar por tecnologias e distância
