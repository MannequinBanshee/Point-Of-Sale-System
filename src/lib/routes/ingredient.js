
const Path = require("path");
const {GetAllIngredients,GetIngredient} = require('../controllers/Product/management');

module.exports =  [
      {
        method: "GET",
        path: "/incredient/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetIngredient
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
      }

]
