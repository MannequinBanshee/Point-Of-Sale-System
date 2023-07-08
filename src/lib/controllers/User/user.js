const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const moment = require('moment');
const User = require('../../models/user');
const Role = require('./role');

const GetUserByID = async (id) => {
    var Found = await User.findOne({'_id': id});
    if(!Found){
      return {'User': null};
    }

    var roles =[];
    var isAdmin = false;
    for(const ObjectId of Found.roles){
     var role = await Role.GetRoleByID(ObjectId._id);
      if(role){
        if(role.AuthorityLevel.toUpperCase() == "ADMINISTRATOR"){
          isAdmin = true;
        }
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
    'password':Found.password,
    'isAdmin': isAdmin
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

const AddUser = async(request,h) => {

  const { username,email,firstname,lastname, password, confirmpassword,roles } = request.payload;  
  if(password === confirmpassword){
    if(username.length > 0 && email.length > 0 && email.includes('@','.'))
    {
      if(firstname.length > 0 && lastname.length > 0)
      {
        if(roles.length > 0)
        { 

          var RolesArray = new Array;
          var verifiedlength = 0;
          var rolesarray = JSON.parse(roles.replace("'",""));
          for(const found of rolesarray.roleids){
            var validrolefound = await Role.GetRoleByID(found.id)
            if(validrolefound){
              verifiedlength++
              RolesArray.push(found.id);
            }
          }

          if(verifiedlength == rolesarray.roleids.length){

            User.create({
              'username':username,
              'email':email,
              'firstname':firstname,
              'lastname':lastname,
              'password':password,
              'roles': RolesArray
            });
            
            return true;
          }
        }
      }
    }
  }

  return false;
  // return h.redirect('/dashboard').state("CurrentSubPage","UserManagement");
}

const UpdateUser = async(req,h) => {

}
const DeleteUser = async(req,h) => {

    var UserID = req.params.id;
    var success = await User.deleteOne({"_id":UserID});
    if(!success){
      return false;
    }
    return true;
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
