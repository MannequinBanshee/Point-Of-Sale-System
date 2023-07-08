
const Path = require("path");
const {UpdateProduct,DeleteProduct} = require("../controllers/Product/product")
const {GetAllProducts,CreateProduct,GetAllProductsForPurchase,AddProductToCart,GetProduct} = require('../controllers/Product/management');

module.exports =  [
      {
        method: "GET",
        path: "/product/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetProduct
      },
      {
        method: "GET",
        path: "/product/AddToCart/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: AddProductToCart
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
        method: "GET",
        path: "/product/purchase/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllProductsForPurchase
      },
      {
        method: "POST",
        path: "/product/new",
        handler: CreateProduct,
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

