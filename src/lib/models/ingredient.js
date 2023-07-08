const mongoose = require("mongoose");

  const IngredientSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Mass: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
    Quantity: {
        type: mongoose.Schema.Types.Number,
        required: false,
        default: 1
      },
      Price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true,
        default: 0.00
      },
    Barcode:{
      type: mongoose.Schema.Types.ObjectId,
        required: true,
      }
  });

module.exports = mongoose.model("Ingredient", IngredientSchema);


