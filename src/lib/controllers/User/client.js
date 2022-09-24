const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const moment = require('moment');
const Client = require('../../models/client');
const Barcode = require('../../models/barcode');
const barcode = require('../Barcode/barcode')

const GetClientByID = async (id) => {
    var client = null;
    var Found = await Client.findOne({'_id': id});
    if(Found){

        var barcodeid = Found.barcode._id.toString();
        var foundbarcode = Barcode.findOne({'id': barcodeid})
        if(foundbarcode){
    
            var clietID = Found._id.toString();
            var clientBarcode = await barcode.GetBarcodeByID(barcodeid);

            client = {'id': clietID,
            'username':Found.username,
            'firstname':Found.firstname,
            'lastname': Found.lastname,
            'date':moment(Found.date).format('YYYY-MM-DD HH:mm:ss'),
            'email':Found.email,
            'location':Found.location,
            'password':Found.password,
            'balance':Found.balance,
            'barcode': clientBarcode
            };

        }

    }

    return client
}

const AddClient = async(request,h) => {

  const { firstname,lastname,email,cellnumber,idnumber,balance,barcodename } = request.payload;  

    if(firstname.length > 0 && lastname.length > 0)
    { 
        var foundbarcode = await barcode.GetBarcodeByName(barcodename);
        if(foundbarcode){

            var phonePattern = RegExp(/\+27[0-9]{9}|0[0-9]{9}/);
            var emailPattern = RegExp(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/);

            Client.create({
            'username':`${firstname}${lastname}`,
            'firstname': firstname,
            'lastname': lastname,
            'email': email != "" ? email.match(emailPattern) ? email : '' : "",
            'password': `${firstname}${lastname}`,
            'cellnumber': cellnumber.match(phonePattern) ? cellnumber : "",
            'identitynumber': idnumber == "" ? 0 : parseInt(idnumber),
            'balance': balance == "" ? 0 : parseFloat(balance),
            'barcode': foundbarcode.id
            });
            
            return true;
            
        }
    }

  return false;
  //return h.redirect('/dashboard').state("CurrentSubPage","UserManagement");
}

const UpdateClient = async(req,h) => {

}
const DeleteClient = async(req,h) => {

    var UserID = req.params.id;
    var success = await User.deleteOne({"_id":UserID});
    if(!success){
      return false;
    }
    return true;
}



module.exports = {
    DeleteClient,
    UpdateClient,
    AddClient,
    GetClientByID
};
