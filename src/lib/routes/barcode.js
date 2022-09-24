
const Path = require("path");
const {CreateBarcodes,NewBarcode,GetBarcode,GetAllBarcodes} = require('../controllers/Barcode/management');

module.exports =  [
      {
        method: "GET",
        path: "/barcode/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetBarcode
      },
      {
        method: "GET",
        path: "/barcode/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllBarcodes
      },
      {
        method: "GET",
        path: "/barcode/new",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: NewBarcode
      },
      {
        method: "GET",
        path: "/barcode/new/{Quantity}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: CreateBarcodes
      }

]
