const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const ingredient = require('./ingredient');
const Ingredient = require('../../models/ingredient');

const GetAllProducts = async (req,h) => {
    return h.view('components/Content/Products/Products');
}

const GetAllIngredients= async (req,h) => {
    
    var ReturnData = new Array;
    var Ingredients = Ingredient.find({}).sort({"Name": 1})
    if((await Ingredients).length > 0){

        for(const iingredient of Ingredients){
            ReturnData.push(await ingredient.GetIngredientByID(iingredient._id));
        }
    }
    return h.view('components/Content/Products/Ingredients',{
        'Ingredients':ReturnData
    });
}

const GetIngredient = async (req,h) => {

    var IngredientId = req.params.id

    var Found = await ingredient.GetIngredientByID(IngredientId);
    if(!Found){

        return h.view('components/Content/Products/IngredientChip',{
            'rolechip': {'id':'invalid','name':'invalid','mass':'invalid'}
        });
    }

    return h.view('components/Content/Products/IngredientChip',{
        'rolechip':Found
    });

}

module.exports = {
    GetAllProducts,
    GetAllIngredients,
    GetIngredient
};
