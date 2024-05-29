const { default: axios } = require("axios");
const Product = require("../models/Product");
const controller = {
  table: async (_, res) => {
    try {
      const tableProduct = await Product.find();
      res.status(200).json({ tableProduct: tableProduct });
    } catch (error) {
      res
        .status(404)
        .json({ msg: "No se encontraron los productos", error: error.message });
    }
  },
  searchById: async (req, res) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res
        .status(404)
        .json({ msg: "Producto por ID no encontrado", error: error.message });
    }
  },
  searchByName: async (req, res) => {
    const name = req.params.name;
    const product = await Product.findOne({ name: name });
    if (product != null) {
      res.status(200).json(product);
    } else {
      res.status(404).json({
        msg: "Producto por Nombre no encontrado",
      });
    }
  },
  dolarPrice: async (_, res) => {
    try {
      const ENDPOINT = "https://dolarapi.com/v1/dolares/contadoconliqui";
      const cclDolarPrice = await axios.get(ENDPOINT);
      res.status(200).json(cclDolarPrice.data);
    } catch (error) {
      res.status(502).json({
        msg: "Información del dolar no disponible",
        error: error.message,
      });
    }
  },
  newProduct: async (req, res) => {
    const newProduct = req.body;
    try {
      await Product.create(newProduct);
      res.status(201).json(newProduct);
    } catch (error) {
      res
        .status(400)
        .json({ msg: "EL producto no pudo ser creado", error: error.message });
    }
  },
  updateProduct: async (req, res) => {
    const name = req.params.name;
    const updateData = req.body;
    const product = await Product.findOneAndUpdate({ name: name }, updateData);

    if (product) {
      const productUpdated = await Product.findOne({ name: product.name });
      res.status(200).json({ msg: productUpdated });
    } else {
      res.status(404).json({
        msg: "El producto no pudo ser actualizado, no se ha encontrado",
      });
    }
  },
  deleteProduct: async (req, res) => {
    const name = req.params.name;
    try {
      const product = await Product.findOneAndDelete(name);
      res.status(200).json({ msg: `Producto eliminado --${product}` });
    } catch (error) {
      res.status(400).json({
        msg: "El producto no puedo ser eliminado",
        error: error.message,
      });
    }
  },
  clearAll: async (_, res) => {
    try {
      await Product.deleteMany();
      res.status(400).json({ msg: "Todos los productos fueron borrados" });
    } catch (error) {
      res.status(400).json({
        msg: "La base de datos no pudo ser borrada",
        error: error.message,
      });
    }
  },
};

module.exports = controller;
