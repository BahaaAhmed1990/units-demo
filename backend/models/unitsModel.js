const mongoose = require("mongoose");

const unitSchema = mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
    },
    pdf: {
      type: String,
      required: true,
    },
    woodenLouvers: {
      type: String,
      require: true,
      default: "A",
    },
    aluminumColor: {
      type: String,
      require: true,
      default: "A",
    },
    villaMainDoor: {
      type: String,
      require: true,
      default: "A",
    },
    stonePattern: {
      type: String,
      require: true,
      default: "A",
    },
    terazooPattern: {
      type: String,
      require: true,
      default: "A",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Unit", unitSchema);
