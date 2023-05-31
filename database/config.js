const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,

    });

    console.log("Conexión exitosa a MongoDB Atlas");
    // Aquí puedes iniciar tu servidor de Express u otras operaciones
  } catch (error) {
    console.log(error);
    throw new Error("Error al conectar a MongoDB Atlas");
  }
};

module.exports = {
  dbConnection,
};
