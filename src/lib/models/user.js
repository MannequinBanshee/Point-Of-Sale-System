const mongoose = require("mongoose");
const Role = require('./role');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
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
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
   location: {     
     type: String,    
     default: "South Africa",
     },
    date: {
      type: Date,
      default: Date.now,
    },
    roles : {
      type: [mongoose.Schema.Types.ObjectId],
      ref: Role
 }
  });

  UserSchema.pre("save", function (next) {
    const user = this
  
    if (this.isModified("password") || this.isNew) {
      bcrypt.genSalt(10, function (saltError, salt) {
        if (saltError) {
          return next(saltError)
        } 
        else {
          bcrypt.hash(user.password, salt, function(hashError, hash) {
            if (hashError) {
              return next(hashError)
            }
  
            user.password = hash
            next()
          })
        }
      })
    } 
    else {
      return next()
    }
  })


module.exports = mongoose.model("User", UserSchema);

