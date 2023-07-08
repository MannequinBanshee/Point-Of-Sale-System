const mongoose = require("mongoose");

const BarcodeSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    format: {
      type: String,
      required: false,
      default: "auto"
    },
    width: {
        type: mongoose.Schema.Types.Number,
        required: false,
        default: 4
      },
    height:{
        type: mongoose.Schema.Types.Number,
        required: false,
        default: 40
    },
    displayvalue: {
        type: mongoose.Schema.Types.Boolean,
        required: false,
        default: true
    }
  });

module.exports = mongoose.model("Barcode", BarcodeSchema);


