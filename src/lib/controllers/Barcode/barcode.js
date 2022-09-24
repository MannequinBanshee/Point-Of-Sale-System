const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const Barcode = require('../../models/barcode');

const GetBarcodeByID = async (id) => {
    
    var Found = await Barcode.findOne({'_id': id});
    if(!Found){
      return {'Barcode': null};
    }
    var barcode = {'id':Found._id.toString(),'name':Found.name,'format':Found.format,'width':Found.width, 'height':Found.height,'displayvalue': Found.displayvalue}
    return barcode;

}


const GetBarcodeByName = async (name) => {
    
  var Found = await Barcode.findOne({'name': name});
  if(!Found){
    return {'Barcode': null};
  }
  var barcode = {'id':Found._id.toString(),'name':Found.name,'format':Found.format,'width':Found.width, 'height':Found.height,'displayvalue': Found.displayvalue}
  return barcode;

}
const AddBarcode = async(request,response) => {

}

const UpdateBarcode = async(request,response) => {

}
const DeleteBarcode = async(request,response) => {


}


module.exports = {
    GetBarcodeByID,
    AddBarcode,
    UpdateBarcode,
    DeleteBarcode,
    GetBarcodeByName
};
