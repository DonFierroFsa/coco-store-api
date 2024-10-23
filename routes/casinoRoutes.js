const express = require("express");
const router = express.Router();
const controllers = require("../controllers/casinoControllers");

router.post("/createCasino", controllers.createCasinoData);

router.get("/casinoData", controllers.casinoData);

router.post("/updateCasinoData", controllers.updateCasinoData);

module.exports = router;
