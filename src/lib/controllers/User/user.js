const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const moment = require('moment');
const User = require('../../models/user');
const Role = require('../role');

const GetUserByID = async (id) => {
    var Found = await User.findOne({'_id': id});
    if(!Found){
      return {'User': null};
    }

    var roles =[];
    for(const ObjectId of Found.roles){
     var role = await Role.GetRoleByID(ObjectId._id);
      if(role){
        roles.push(role);
      }
    }

    var user = {'id': Found._id.toString(),
    'username':Found.username,
    'firstname':Found.firstname,
    'lastname': Found.lastname,
    'date':moment(Found.date).format('YYYY-MM-DD HH:mm:ss'),
    'roles': roles,
    'email':Found.email,
    'location':Found.location,
    'password':Found.password
    };
    return user
}



const AuthenticateUser = async (username,password) => {
  var Found = await User.findOne({'username': username});

  if(!Found){
    return {'User': null,'isValid': false};
  }

  var isValid = await Bcrypt.compare(password,Found.password);
  return {'User': Found,'isValid': isValid};
}

const AddUser = async(request,response) => {

}

const UpdateUser = async(request,response) => {

}
const DeleteUser = async(request,response) => {

}

const validateCookie = async (req,session) => {

  const account = await User.findOne({'_id': session.id });
  
  if (!account) {
      return { valid: false };
  }

  return { valid: true, credentials: account };

}


module.exports = {
    GetUserByID,
    AuthenticateUser,
    AddUser,
    UpdateUser,
    DeleteUser,
    validateCookie
};
