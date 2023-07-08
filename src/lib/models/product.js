const mongoose = require("mongoose");

  const ProductSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
   cost: {     
     type: mongoose.Schema.Types.Decimal128,
     required: true,
     default: 0.00,
    },
    vat: {
      type: Boolean,
      default: false,
    },
    purchases:{
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
    }
  });

module.exports = mongoose.model("Product", ProductSchema);


