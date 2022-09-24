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
      type: [mongoose.Schema.Types.ObjectId],
      required: false,
    },
    Image: {
      type: 
      {
        data: mongoose.Schema.Types.Buffer,
        contentType: mongoose.Schema.Types.String
      },
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
    },
    Purchases:{
      type: mongoose.Schema.Types.Number,
      required: true,
      default: 0,
    }
  });

module.exports = mongoose.model("Product", ProductSchema);


