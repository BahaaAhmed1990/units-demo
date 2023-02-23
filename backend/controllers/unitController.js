const asyncWrapper = require("../middlewares/asyncWrapper");
const Unit = require("../models/unitsModel");

// @desc get unit
// @route GET api/unit
// @acess public
const getUnit = asyncWrapper(async (req, res, next) => {
  console.log(req.query);
  if (Object.keys(req.query).length === 0) {
    res.statusCode = 403;
    const units = await Unit.find();
    res.status(200).json(units);
  } else {
    const {
      woodenLouvers,
      aluminumColor,
      villaMainDoor,
      stonePattern,
      terazooPattern,
    } = req.query;
    console.log(
      woodenLouvers,
      aluminumColor,
      villaMainDoor,
      stonePattern,
      terazooPattern
    );
    const units = await Unit.find({
      woodenLouvers,
      aluminumColor,
      villaMainDoor,
      stonePattern,
      terazooPattern,
    });
    res.status(200).json(units);
  }
});

// @desc add unit
// @route POST api/units
// @acess public
const addUnit = asyncWrapper(async (req, res, next) => {
  if (!req.body) {
    res.statusCode = 403;
    throw new Error("please add vaild body data");
  }
  console.log(req.body);
  const unit = await Unit.create({
    fileName: req.body.fileName,
    pdf: req.body.pdf,
    woodenLouvers: req.body.woodenLouvers,
    aluminumColor: req.body.aluminumColor,
    villaMainDoor: req.body.villaMainDoor,
    stonePattern: req.body.stonePattern,
    terazooPattern: req.body.terazooPattern,
  });
  res.status(200).json(unit);
});
module.exports = {
  getUnit,
  addUnit,
};
