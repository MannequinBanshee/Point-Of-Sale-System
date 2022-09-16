"use strict";

const User = require("../models/User");

module.exports = async (request, h) => {

  switch(request.method.toUpperCase()){

  case 'POST':



  break;

  default:

    h.redirect('/login');

  break;

  }

};

const registerUser = (req, h) => {
  const { username,firstname, lastname, email, password, confirm } = req.body;
  //Confirm Passwords





  };