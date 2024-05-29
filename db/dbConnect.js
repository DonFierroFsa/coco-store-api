const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Conexión a base de datos exitosa`);
  } catch (error) {
    console.log(`Fallo en conexión a base de datos.-error ${error.message}`);
  }
};

module.exports = dbConnect;
