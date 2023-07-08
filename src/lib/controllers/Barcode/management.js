const mongoose = require("mongoose");
const JsBarcode = require('jsbarcode');
const {createCanvas} = require('canvas');
const uuid = require('uuid');
const Barcode = require('../../models/barcode');
const barcode = require('./barcode');
const Ingredient = require('../../models/ingredient')
const Client = require('../../models/client')
const Path = require('path');
const fs = require("fs");
const winston = require("../../../logger");
const ingredient = require("../../models/ingredient");

const GetAllBarcodes = async (req,h) => {

    var ReturnData = new Array;
    var Barcodes = await Barcode.find({}).sort({'name': 1});
    var AllocatedIngredientBarcodes = await Ingredient.find({});
    var AllocatedClientBarcodes = await Client.find({});
    if(Barcodes){

        for(const ibarcode of Barcodes){
            if(AllocatedIngredientBarcodes || AllocatedClientBarcodes){
                if(
                    AllocatedIngredientBarcodes.find(a => a.Barcode._id.toString().toUpperCase() == ibarcode._id.toString().toUpperCase()) || 
                    AllocatedClientBarcodes.find(b => b.barcode._id.toString().toUpperCase() == ibarcode._id.toString().toUpperCase())
                ){
                    continue;
                }
            }
            ReturnData.push(await barcode.GetBarcodeByID(ibarcode._id));
        }

        return h.view('components/Content/Barcodes/barcodes',{
            'Barcodes':ReturnData
        });
    }
    return null;
    

}

const DeleteBarcode = async (req,h) => {

    var Barcodeid = req.params.id
    if(Barcodeid){

        var result = await Barcode.remove({_id:Barcodeid});
        if(result){
            return true;
        }
    }
    return false;
    
}

const DeleteBarcodeByName = async (req,h) => {

    var BarcodeName = req.params.name
    if(BarcodeName){

        var result = await Barcode.remove({name:BarcodeName});
        if(result){
            return true;
        }
    }
    return false;
    
}

const CreateBarcodes = async (req,h) => {


    var Quantity = parseInt(req.params.Quantity);

    for(var i = 0; i <= Quantity; i++){

        var BarcodeCanvas = createCanvas();
        var guid = uuid.v1().substring(0,8);
        // JsBarcode(BarcodeCanvas,guid)
        var CreatedBarcode = await Barcode.create({"name": guid});
        // var canvasData = BarcodeCanvas.toBuffer("image/png");
        // var ServerSidePath = Path.join(__dirname,"../../../../static/public/assets/images/Barcodes");
        // if(fs.existsSync(ServerSidePath)){
        //     var success = await fs.writeFile(`${ServerSidePath}/${guid}.png`,canvasData,(error) => {

        //         if(error){
        //             winston.error(error.message);
        //         }
    
        //       });
        // }

    }
    return true;
}

const CreateSingleBarcode = async (req,h) => {

    var BarcodeCanvas = createCanvas();
    var guid = uuid.v1().substring(0,8);
    try{
        // JsBarcode(data,guid);
        var CreatedBarcode = await Barcode.create({"name": guid});
        // var canvasData = BarcodeCanvas.toBuffer("image/png");
        // var ServerSidePath = Path.join(__dirname,"../../../../static/public/assets/images/Barcodes");
        // if(fs.existsSync(ServerSidePath)){
        //   var success = await fs.writeFile(`${ServerSidePath}/${guid}.png`,canvasData,(error) => {
        //     if(error){
        //         winston.error(error.message);
        //     }
        //   });
        // }
    }
    catch(e){
        winston.error(e.message);
        guid = "INVALID";
    }


    return guid;
}

const NewBarcode = async (req,h) => {

    const ServerSidePath = Path.join(__dirname,"../../../../static/public/assets/images/Barcodes");
    var CreatedBarcode;
    var guid = "";
    var ReturnBarcode;
    try{
        guid = uuid.v1().substring(0,8);
        // var BarcodeCanvas = createCanvas();
        // JsBarcode(BarcodeCanvas,guid)
        CreatedBarcode = await Barcode.create({"name": guid});
        // const canvasData = BarcodeCanvas.toBuffer("image/png");
        // if(fs.existsSync(ServerSidePath)){
        //     var success = await fs.writeFile(`${ServerSidePath}/${guid}.png`,canvasData,(error) => {

        //         if(error){
        //             winston.error(error.message);
        //         }
    
        //       });
        // }
    }
    catch(e){
        winston.error(e.message);
    }finally{
        ReturnBarcode = {"id": CreatedBarcode ? CreatedBarcode._id.toString(): "INVALID","canvasPath":`assets/images/Barcodes/${guid}.png`,"name": guid}
    }

    return h.view('components/Content/Barcodes/BarcodeChip',{
        'Barcode':ReturnBarcode
    });

}

const GetBarcode = async (req,h) => {



}

module.exports = {
    GetBarcode,
    NewBarcode,
    GetAllBarcodes,
    CreateBarcodes,
    GetAllBarcodes,
    CreateSingleBarcode,
    DeleteBarcode,
    DeleteBarcodeByName
};
