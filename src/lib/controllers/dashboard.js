"use strict";

const winston = require('../../logger');
const user = require('../controllers/User/user');
const management = require('../controllers/User/management');
const Role = require('../models/role');

module.exports = async (req, h) => {

    var UserID = req.state.Authentication.id;
    
    if(!UserID){
        h.unstate('Authentication');
        return h.redirect('/login',{'Data':{
            'message': "Invalid Credentials",
            'isError': true
          }
          });
    }

    var Access = [];
    var User = await user.GetUserByID(UserID);
    var Roles = await Role.find({}).sort({'AccessName': 1});

    for(const userRole of User.roles){
        const roleIndex = Roles.findIndex(r => r.id == userRole.id);
        if(roleIndex > -1){
            Access.push({'AccessName':Roles[roleIndex].AccessName,'AuthorityLevel':Roles[roleIndex].AuthorityLevel});
        }        
    }

    return h.view("dashboard",{Data:{
        'User' : User,
        'message': "",
        'isError': false,
        'Access': Access
    }});
    
};