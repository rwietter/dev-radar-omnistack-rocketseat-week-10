const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");

const { setupWebSocket } = require("./websocket");

const app = express();
const server = http.Server(app); // - conecta ao http

setupWebSocket(server); // -  conecta ao websocket

const mongodb = `mongodb+srv://<>:<>@cluster0-yjhux.mongodb.net/week10?retryWrites=true&w=majority`;

mongoose.connect(mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.use(routes);
server.listen(3333);
