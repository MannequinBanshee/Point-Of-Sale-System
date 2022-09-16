const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const User = require('../../models/user');
const user = require('./user');

const GetAllUsers = async (req,h) => {

    var UserID = req.state.Authentication.id;
    var CurrentUser = await user.GetUserByID(UserID);
    if(CurrentUser){
        const Users = new Array;
        for(const role of CurrentUser.roles){
            var Found = await User.find({}).select('id').where(`roles:{${role.id}}`)
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

        var CurrentUserIndex = Users.findIndex(e => e.id == CurrentUser.id)
        if(CurrentUserIndex > -1){
            Users.splice(CurrentUserIndex,1);
        }
    
        return h.view('components/Content/users',{Users});

    }
}

const CheckifExists = async(UsersArray,newUser) => {
    
    if(UsersArray.filter(e => e.id == newUser.id).length > 0){
        return true;
    }
    return false;
}

module.exports = {
    GetAllUsers
};
