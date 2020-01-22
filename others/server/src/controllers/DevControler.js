const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  // - listar users do database
  async index(request, response) {
    const devs = await Dev.find();
    return response.json(devs);
  },

  // - rota de busca, longitude e latitude
  // ! usar apenas um index por controller

  // - cria user no database
  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });
    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;
      // - se name não existir, use o login

      techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
      return response.json(dev);
    }
  }
};

/*
- Controllers tem 5 funções:
- index: buscar uma lista
- show: mostrar uma única consulta
- store: criar
- update: atualizar
- destroy: deletar
*/
