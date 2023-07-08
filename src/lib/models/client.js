const mongoose = require("mongoose");
const Barcode = require('./barcode');
const bcrypt = require('bcrypt');

const ClientSchema = new mongoose.Schema({
    username: {
      type: String,
      required: false,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    cellnumber: {
        type: String,
        required: false,
      },
    identitynumber: {
    type: Number,
    required: false,
    },     
    password: {
      type: String,
      required: false,
    },
   location: {     
     type: String,    
     default: "South Africa",
     },
    balance: {     
    type: mongoose.Schema.Types.Decimal128,    
    default: 0.00,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    barcode : {
      type: mongoose.Schema.Types.ObjectId,
      ref: Barcode
 }
  });

  ClientSchema.pre("save", function (next) {
    const client = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } 
        else {
          bcrypt.hash(client.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            client.password = hash
            next()
          })
        }
      })
    } 
    else {
      return next()
    }
  })


module.exports = mongoose.model("Client", ClientSchema);

