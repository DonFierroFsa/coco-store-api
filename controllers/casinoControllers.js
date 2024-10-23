const CasinoData = require("../models/casinoData");

const controllers = {
  createCasinoData: async (_, res) => {
    const casinoData = {
      bonus: 50,
      cashLoadLimit: 5000,
      nameCasino: "MAXI CASINO",
    };
    try {
      await CasinoData.create(casinoData);
      res.status(201).json({ msg: "Registro de datos del casino creado" });
    } catch (error) {
      res.status(400).json({
        msg: "Ya existe un registro de datos del casino",
        error: error.message,
      });
    }
  },

  casinoData: async (_, res) => {
    try {
      const casinoData = await CasinoData.find();
      console.log(casinoData);
      res.status(200).json({ casinoData: casinoData[0] });
    } catch (error) {
      res.status(400).json({
        msg: "No se pudo cargar los datos del casino",
        error: error.message,
      });
    }
  },
  updateCasinoData: async (req, res) => {
    const { bonus, nameCasino, cashLoadLimit } = req.body;
    const newCasinoData = { bonus, nameCasino, cashLoadLimit };
    const id_CasinoData = "67006683a41ea4bc03cc7c5d";

    const verification = await CasinoData.findByIdAndUpdate(
      id_CasinoData,
      newCasinoData
    );
    if (verification) {
      res
        .status(200)
        .json({ msg: "Casino Actualizado", casinoData: newCasinoData });
    } else {
      res.status(400).json({
        msg: "Los datos del casino no se actualizaron",
        error: error.message,
      });
    }
  },
};

module.exports = controllers;
