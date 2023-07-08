
const Path = require("path");
const {GetAllIngredients,GetIngredient} = require('../controllers/Product/management');
const {CreateNewIngredient,DeleteIngredient} = require('../controllers/Product/ingredient')

module.exports =  [
      {
        method: "GET",
        path: "/ingredient/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetIngredient
      },
      {
        method: "DELETE",
        path: "/ingredient/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: DeleteIngredient
      },
      {
        method: "GET",
        path: "/ingredient/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllIngredients
      },
      {
        method: "POST",
        path: "/ingredient/new",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: CreateNewIngredient
      }

]
