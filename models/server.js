const express = require("express");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    // middleware
    this.middleware();

    // Rutas de mi aplicación
    this.routes();
  }

  middleware() {
    // cors
    this.app.use(cors());

    // body-parser
    this.app.use(express.json());

     
    // directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"))
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor en funcionamiento en el puerto ${this.port}`);
    });
  }
}

module.exports = Server;
