const { Router } = require("express");
const DevController = require("./controllers/DevControler");
const SearchController = require("./controllers/DevSearch");

const routes = Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);
routes.get("/search", SearchController.index);
module.exports = routes;
