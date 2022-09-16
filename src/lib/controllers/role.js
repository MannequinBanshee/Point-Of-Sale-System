const mongoose = require("mongoose");
const Role = require('../models/role');

const GetRoleByID = async (id) => {
    var Found = await Role.findOne({'_id': id});
    if(!Found){
      return {'Role': null};
    }
    var role = {'id':Found._id,'AccessName':Found.AccessName,'AuthorityLevel':Found.AuthorityLevel}
    return role;
}


module.exports = {
    GetRoleByID
};
