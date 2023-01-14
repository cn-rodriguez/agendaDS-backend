const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
    throw new Error("No se pudo conectar a la base de datos");
  }
};

module.exports = {
  dbConnection,
};
