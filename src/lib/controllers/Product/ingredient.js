const mongoose = require("mongoose");
const Ingredient = require('../../models/ingredient');

const GetIngredientByID = async (id) => {

    const Found = await Ingredient.find({"id": id});
    if(!Found){
        return null;
    }
    var ingredient = {'id':Found._id.toString(),'Name':Found.Name,'Mass':Found.Mass,'Quantity':Found.Quantity,'Barcode':Found.Barcode}
    return ingredient;

}

module.exports = {
    GetIngredientByID
};
