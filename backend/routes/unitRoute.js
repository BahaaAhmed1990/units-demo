const express = require("express");
const { getUnit, addUnit } = require("../controllers/unitController");

const router = express.Router();

router.route("/").get(getUnit);
router.route("/").post(addUnit);

module.exports = router;
