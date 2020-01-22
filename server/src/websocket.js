const socketio = require("socket.io");
const connections = [];
const calculateDistance = require("./utils/calculateDistance");

let io;
// - salvando os dados da aplicação na memória do node
exports.setupWebSocket = server => {
  io = socketio(server);
  io.on("connection", socket => {
    const { latitude, longitude, techs } = socket.handshake.query;
    connections.push({
      id: socket.id,
      coordinate: {
        latitude: Number(latitude),
        longitude: Number(longitude)
      },
      techs: techs.split(",").map(tech => tech.trim())
    });
  });
};

// filtra por distância e por tecnologias
exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    return (
      calculateDistance(coordinates, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};
exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
