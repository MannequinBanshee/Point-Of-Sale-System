const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const ingredient = require('./ingredient');
const Ingredient = require('../../models/ingredient');
const Product = require('../../models/product');
const product = require('./product')

const GetAllProducts = async (req,h) => {

    var ReturnData = new Array;
    var products = await Product.find({}).sort({"Name": 1}).select('id');
    if(products.length > 0){
        for(const iproduct of products){
            ReturnData.push(await product.GetProductByID(iproduct._id))
        }
    }
    return h.view('components/Content/Products/Products',{
        'Products':ReturnData
    });
}
const GetAllProductsForPurchase = async (req,h) => {

    var ReturnData = new Array;
    var products = await Product.find({}).sort({"Name": 1}).select('id');
    if(products.length > 0){
        for(const iproduct of products){
            ReturnData.push(await product.GetProductByID(iproduct._id))
        }
    }
    return h.view('components/Content/Products/ProductsDDL',{
        'Products':ReturnData
    });
}

const GetAllIngredients= async (req,h) => {
    
    var ReturnData = new Array;
    var Ingredients = await Ingredient.find({}).sort({"Name": 1})
    if(Ingredients.length > 0){
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
            'IngredientChip': {'id':'invalid','name':'invalid','mass':'invalid'}
        });
    }

    return h.view('components/Content/Products/IngredientChip',{
        'IngredientChip':Found
    });

}

const GetProduct = async (req,h) => {

    var ProductID = req.params.id

    var Found = await product.GetProductByID(ProductID);
    if(!Found){
        return {'Product': {'id':'invalid'}};
    }

    return {'Product':Found};

}

const CreateProduct = async(req,h) => {

    var {name,ingredients,price,type,vat} = req.payload;
    if(name != "" && ingredients.length >0){

        var ingredientids = Array.from(JSON.parse(ingredients).ingredientids);
        var ingredientidArray = new Array();
        for(const iingredient of ingredientids){
            var FoundIngredient = await ingredient.GetIngredientByID(iingredient.id);
            if(FoundIngredient){
                ingredientidArray.push(FoundIngredient.id);
            }
        }

        if(type != "" && price != 0){

            if(vat){
                var vatbool = vat == "on" ? true : false;
                var newProduct = {
                    "name":name,
                    "ingredients": ingredientidArray,
                    "cost": parseFloat(price),
                    "vat": vatbool,
                    "type": type
                }
                Product.create(newProduct);
                return true;
            }

        }

    }
    return false;
}

const AddProductToCart = async (req,h) => {

    var ProductID = req.params.id
    var Found = await product.GetProductByID(ProductID);
    return h.view('components/Content/Products/ProductRowItem',{"Product":Found})
}

module.exports = {
    GetAllProducts,
    GetAllIngredients,
    GetIngredient,
    GetProduct,
    CreateProduct,
    GetAllProductsForPurchase,
    AddProductToCart
};
