
const Path = require("path");
const {CreateBarcodes,NewBarcode,GetBarcode,GetAllBarcodes,CreateSingleBarcode,DeleteBarcode,DeleteBarcodeByName} = require('../controllers/Barcode/management');

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
        method: "DELETE",
        path: "/barcode/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: DeleteBarcode
      },
      {
        method: "DELETE",
        path: "/barcode/delete/{name}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: DeleteBarcodeByName
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
        path: "/barcode/new/nameonly",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: CreateSingleBarcode
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
