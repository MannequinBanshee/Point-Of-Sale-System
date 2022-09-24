
const Path = require("path");
const {GetDashBoard} = require("../controllers/dashboard");

module.exports =  [
      {
        method: "GET",
        path: "/dashboard",
        options: {
          auth: {
            mode: 'required',
          }
      },
        handler: GetDashBoard
      },
      {
        method: "GET",
        path: "/dashboard/{CurrentSubPage}",
        options: {
          auth: {
            mode: 'required',
          }
      },
        handler: GetDashBoard
      }
    ];

