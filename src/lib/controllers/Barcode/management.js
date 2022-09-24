const mongoose = require("mongoose");
const JsBarcode = require('jsbarcode');
const {createCanvas} = require('canvas');
const uuid = require('uuid');
const Barcode = require('../../models/barcode');
const barcode = require('./barcode');
const Path = require('path');
const fs = require("fs");

const GetAllBarcodes = async (req,h) => {

    var ReturnData = new Array;
    var Barcodes = await Barcode.find({}).sort({'name': 1});
    if(Barcodes){

        for(const ibarcode of Barcodes){
            ReturnData.push(await barcode.GetBarcodeByID(ibarcode._id));
        }

        return h.view('components/Content/Barcodes/barcodes',{
            'Barcodes':ReturnData
        });
    }
    return null;
    

}

const CreateBarcodes = async (req,h) => {


    var Quantity = parseInt(req.params.Quantity);

    for(var i = 0; i <= Quantity; i++){

        var BarcodeCanvas = createCanvas();
        var guid = uuid.v1().substring(0,8);
        JsBarcode(BarcodeCanvas,guid)
        var CreatedBarcode = await Barcode.create({"name": guid});
        var canvasData = BarcodeCanvas.toBuffer("image/png");
        var ServerSidePath = Path.join(__dirname,"../../../../static/public/assets/images/Barcodes");
        if(fs.existsSync(ServerSidePath)){
            fs.writeFileSync(`${ServerSidePath}/${guid}.png`,canvasData);
        }

    }
    return true;
}

const NewBarcode = async (req,h) => {

    var BarcodeCanvas = createCanvas();
    var guid = uuid.v1().substring(0,8);
    JsBarcode(BarcodeCanvas,guid)
    var CreatedBarcode = await Barcode.create({"name": guid});
    const canvasData = BarcodeCanvas.toBuffer("image/png");
    const ServerSidePath = Path.join(__dirname,"../../../../static/public/assets/images/Barcodes");
    if(fs.existsSync(ServerSidePath)){
        fs.writeFileSync(`${ServerSidePath}/${guid}.png`,canvasData);
    }

    var ReturnBarcode = {"id": CreatedBarcode._id.toString(),"canvasPath":`assets/images/Barcodes/${guid}.png`}

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
    GetAllBarcodes
};
