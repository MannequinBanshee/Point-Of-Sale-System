const mongoose = require("mongoose");
const moment = require('moment');
const Product = require("./product")
const User = require("./user")
const Client = require("./client");

  const OrderSchema = new mongoose.Schema({
    orderno: {
        type: mongoose.Schema.Types.String,
         default: moment(new Date()).format('YYYYMMDDHHmmss')
    },
    openDate: {
        type: Date,
        default: Date.now,
      },
    completeDate: {
        type: Date,
        required :false
    },
    client :{
        id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: Client}, //false in case the client gets removed
        firstname: {type: mongoose.Schema.Types.String, required: true},
        lastname: {type: mongoose.Schema.Types.String, required: true},
        oldBalance: {type: mongoose.Schema.Types.Decimal128, required: true},
        newBalance: {type: mongoose.Schema.Types.Decimal128, required: true}
    },
    user :{
        id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: User}, //false in case the user gets removed
        firstname: {type: mongoose.Schema.Types.String, required: true},
        lastname: {type: mongoose.Schema.Types.String, required: true}
    },
    paymentType: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    products: [{
        id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: Product}, //false in case the product gets removed
        name: {type: mongoose.Schema.Types.String, required: true},
        quantity: {type: mongoose.Schema.Types.Number, required: true},
        price: {type: mongoose.Schema.Types.Decimal128, required: true},
        vat: {type: mongoose.Schema.Types.Decimal128, required:false, default: 0.00}
    }],
    totalCost: {     
        type: mongoose.Schema.Types.Decimal128,
        required: false,
        default: 0.00
    },
    paymentAmount: {     
        type: mongoose.Schema.Types.Decimal128,
        required: false,
        default: 0.00
    },
    changeAmount: {     
        type: mongoose.Schema.Types.Decimal128,
        required: false,
        default: 0.00
    }
  });

module.exports = mongoose.model("Order", OrderSchema);


