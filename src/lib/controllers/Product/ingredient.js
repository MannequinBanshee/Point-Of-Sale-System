const mongoose = require("mongoose");
const Ingredient = require('../../models/ingredient');
const barcode = require('../Barcode/barcode')

const GetIngredientByID = async (id) => {

    const Found = await Ingredient.findOne({"_id": id});
    var ingredient = {'id':"Invalid",
        'Name':"Invalid",
        'Mass':"Invalid",
        'Quantity':"Invalid",
        'Barcode':"Invalid"
    }
    if(Found){
        var IngredientId = Found._id.toString();
        ingredient = {'id':IngredientId,
        'Name':Found.Name,
        'Mass':Found.Mass,
        'Quantity':Found.Quantity,
        'Barcode':Found.Barcode}
    }

    return ingredient;

}

const CreateNewIngredient = async (req,h) => {

    var {name,weight,quantity,price,barcodeid} = req.payload;

    if(name != "" || weight != 0){

        if(quantity != 0 || price != 0){

            var FoundBarcode = await barcode.GetBarcodeByID(barcodeid);
            if(FoundBarcode){

                var ingredient = {
                'Name':name,
                'Mass':weight,
                'Price':price,
                'Quantity':quantity,
                'Barcode':FoundBarcode.id
        
                }

                Ingredient.create(ingredient);

                return true;

            }
        }
    }
    return false;
}

const DeleteIngredient = async (req,h) => {

    var ingredientid = req.params.id;
    const Found = await Ingredient.deleteOne({_id: ingredientid});
    if(!Found){
        return null;
    }
    return true;
}

module.exports = {
    GetIngredientByID,
    CreateNewIngredient,
    DeleteIngredient
};
