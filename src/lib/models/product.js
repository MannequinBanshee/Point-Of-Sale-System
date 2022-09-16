const mongoose = require("mongoose");

  const ProductSchema = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Ingredients: {
      type: mongoose.Schema.Types.Array,
      required: false,
    },
   Cost: {     
     type: mongoose.Schema.Types.Decimal128,
     required: true,
     default: 0.00,
     },
    Vat: {
      type: Boolean,
      default: false,
    }
  });

module.exports = mongoose.model("Product", ProductSchema);


