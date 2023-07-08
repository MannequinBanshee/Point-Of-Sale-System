const Bcrypt = require('bcrypt');
const winston = require('../../../logger');
const mongoose = require("mongoose");
const Product = require('../../models/product');
const ingredient = require('./ingredient');

const GetProductByID = async (id) => {

    var Found = await Product.findOne({_id: id});
    if(!Found){
      return {'Product': null};
    }

    var ingredientids = Found.ingredients;
    var IngredientsArray = new Array;
    for(const ingredientid of ingredientids){
      var found = await ingredient.GetIngredientByID(ingredientid);
      if(!found.id.toLocaleUpperCase().includes("INVALID")){
        IngredientsArray.push(found);
      }
      else{

        await Product.updateOne(
          {'_id': id}, 
          {$pullAll: {ingredients: [{_id: ingredientid._id }]}},
          { multi: true }
        );
      }
      
    }

    var product = {'id':Found._id.toString(),
    'name':Found.name,
    'ingredients':IngredientsArray,
    'price':Found.cost,
    'type':Found.type,
    'vat': Found.vat
    }
    return product;
}

const AddProduct = async(req,h) => {

}

const UpdateProduct = async(req,h) => {

}
const DeleteProduct = async(req,h) => {

  var ProductID = req.params.id;
  var success = await Product.deleteOne({"_id":ProductID});
  if(!success){
    return false;
  }
  return true;


}


module.exports = {
    GetProductByID,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
};
