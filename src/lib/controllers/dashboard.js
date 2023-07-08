"use strict";

const winston = require('../../logger');
const user = require('../controllers/User/user');
const management = require('../controllers/User/management');
const Settings = require('../../settings')
const Role = require('../models/role');



const GetDashBoard = async(req,h) =>{

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

    var CurrentSubPage = "DashBoard";
    if(req.state.CurrentSubPage){
        if(req.state.CurrentSubPage != CurrentSubPage){
            CurrentSubPage = req.state.CurrentSubPage.toString();
        }
    }


    var PageData = {Data:{
        'User' : User,
        'message': "",
        'isError': false,
        'Access': Access,
        'Roles':Roles,
        'CurrentSubPage': CurrentSubPage
    }};

    return h.view("dashboard",PageData);
}


const UpdateCurrentSubPage = async(req,h) =>{

    var CurrentSubPage = req.params.SubPageName;
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
            Access.push(`${Roles[roleIndex].AccessName}`);
        }        
    }

    if(Access.includes(CurrentSubPage)){

        return h.redirect('/dashboard').state("CurrentSubPage",CurrentSubPage);
    }

    return false;
}


module.exports =  {
    GetDashBoard,
    UpdateCurrentSubPage
};