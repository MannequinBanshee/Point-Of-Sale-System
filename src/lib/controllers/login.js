"use strict";

const { response } = require("@hapi/hapi/lib/validation");
const user = require('../controllers/User/user');
const request = require('request-promise');

module.exports = async (req, h) => {
  switch(req.method.toUpperCase())
  {
    case "GET":

    h.unstate('Authentication');
    return h.view("login",{'Data':{
    }});

    break;

    case "POST":

      const { username, password } = req.payload;      
      var {User,isValid} = await user.AuthenticateUser(username,password);

      if (!User || !isValid) {

        h.unstate('Authentication');
        return h.view('login',{Data:{
          'message': "Invalid Credentials. Please Try Again.",
          'isError': true
        }
        });
    }
    req.cookieAuth.set({'id': User.id.toString()});//only used for authentication
    return h.redirect('/dashboard');
    
    break;
  }
};