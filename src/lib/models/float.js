const mongoose = require("mongoose");
const Order  = require("./order");
const User = require("./user");

const FloatSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
      },
    startamount: {     
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    transaction: [ {
        userID: {
            id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: User}, //false in case the user gets removed
            firstname: {type: mongoose.Schema.Types.String, required: true},
            lastname: {type: mongoose.Schema.Types.String, required: true}
        },
        amount: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        },
        type:{
            type: mongoose.Schema.Types.String,
            required: true
        }

    }]
});

module.exports = mongoose.model("Float", FloatSchema);


