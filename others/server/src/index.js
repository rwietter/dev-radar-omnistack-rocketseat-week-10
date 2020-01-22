const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");

const app = express();

mongoose.connect(
  "mongodb+srv://euiciowr:mo5rU2sHgZV6yNc0@cluster0-yjhux.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

app.use(cors()); // * cors({ origin: "http://localhost:3000" })
app.use(express.json());

/*
 ? Métodos HTTP:
 - GET: buscar alguma coisa, user...
 - POST: criar algum objeto, salvar...
 - PUT: editar um recurso
 - DELETE: deletar um recurso
*/
/*
 ? Tipos de parametros express:
 - Query params: req.query {GET, filter of search, orden and pagination}
 - Route params: delete or modified {PUT, DELETE} app.delete("/users/id:1",
 - Body: create informations {POST, PUT}: request.body (dados para criação ou alteração de um registro)
*/
app.use("/api", routes);
// app.post("/users", (request, response) => {
//   console.log(request.body);
//   return response.json({ message: "Hello, OmniStack" });
// });

app.listen(3333);
