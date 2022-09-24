
const Path = require("path");
const {GetProductByID,AddProduct, UpdateProduct,DeleteProduct} = require("../controllers/Product/product")
const {GetAllProducts} = require('../controllers/Product/management');

module.exports =  [
      {
        method: "GET",
        path: "/product/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetProductByID
      },
      {
        method: "GET",
        path: "/product/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllProducts
      },
      {
        method: "POST",
        path: "/product",
        handler: AddProduct,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "PUT",
        path: "/product/{id}",
        handler: UpdateProduct,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "Delete",
        path: "/product/{id}",
        handler: DeleteProduct,
        options: {
            auth: {
              mode: 'required',
            }
        }
      }  
    ];

