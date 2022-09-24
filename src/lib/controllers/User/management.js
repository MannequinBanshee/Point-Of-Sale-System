const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const User = require('../../models/user');
const Role = require('../../models/role');
const user = require('./user');
const role = require('./role');
const Client = require('../../models/client')
const client = require('./client')

const GetAllUsers = async (req,h) => {

    var UserID = req.state.Authentication.id;
    var CurrentUser = await user.GetUserByID(UserID);
    if(CurrentUser){
        const Users = new Array;
        for(const urole of CurrentUser.roles){

            if(urole.AccessName.toUpperCase() == "USERMANAGEMENT"){

                var Found;

                switch(urole.AuthorityLevel.toUpperCase()){

                    case "ADMINISTRATOR":

                        Found = await User.find({}).select('id');   
    
                    break;
    
                    case "STANDARD":
    
                        Found = await User.find({"roles": urole.id}).select('id');
    
                    break;
                }

                if(Found){
                    for(const usr of Found){
                        userfound = await user.GetUserByID(usr._id);
                        if(userfound){
                            if(!(await CheckifExists(Users,userfound))){
                                Users.push(userfound);
                            }
                        }
                    }
                }    
            }

        }

        var CurrentUserIndex = Users.findIndex(e => e.id == CurrentUser.id)
        if(CurrentUserIndex > -1){
            Users.splice(CurrentUserIndex,1);
        }
    
        return h.view('components/Content/Users/users',{
            'Users':Users      
        });

    }
}

const GetAllClients = async (req,h) => {

    var UserID = req.state.Authentication.id;
    var CurrentUser = await user.GetUserByID(UserID);
    if(CurrentUser){
        const Clients = new Array;
        var clientids = await Client.find({}).select('id');
        for(const clientid of clientids){
            Clients.push(await client.GetClientByID(clientid));
        }

        return h.view('components/Content/Accounts/clients',{
            'Clients':Clients      
        });

    }
}

const GetAllRoles= async (req,h) => {

    var ReturnData = new Array;
    var Roles = await Role.find({}).sort({'AccessName': 1});
    if(Roles){

        for(const irole of Roles){
            ReturnData.push(await role.GetRoleByID(irole._id));
        }

        return h.view('components/Content/Users/roles',{
            'Roles':ReturnData
        });
    }
    return null;
}

const GetALLRolesByAuthorityLevel= async (req,h) => {

    var AuthorityLevel = req.params.AuthorityLevel;
    if(AuthorityLevel.toUpperCase() == "ADMINISTRATOR" || AuthorityLevel.toUpperCase() == "STANDARD"){

        var ReturnData = new Array;
        var Roles = await Role.find({"AuthorityLevel": AuthorityLevel}).sort({'AccessName': 1});
        if(Roles){
            for(const irole of Roles){
                ReturnData.push(await role.GetRoleByID(irole._id));
            }
            return h.view('components/Content/Users/roles',{
                'Roles':ReturnData
            });
        }
        return null;

    }
    else{
        return h.status(500);
    }

}

const GetRole = async (req,h) => {
    var RoleId = req.params.id

    var Found = await role.GetRoleByID(RoleId);
    if(!Found){

        return h.view('components/Content/rolechip',{
            'rolechip': {'id':'invalid','AccessName':'invalid','AuthorityLevel':'invalid'}
        });
    }

    return h.view('components/Content/Users/rolechip',{
        'rolechip':Found
    });
    
}



const CheckifExists = async(UsersArray,newUser) => {
    
    if(UsersArray.filter(e => e.id == newUser.id).length > 0){
        return true;
    }
    return false;
}

module.exports = {
    GetAllUsers,
    GetAllRoles,
    GetRole,
    GetALLRolesByAuthorityLevel,
    GetAllClients
};
