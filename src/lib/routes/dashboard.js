
const Path = require("path");
const {GetDashBoard,UpdateCurrentSubPage} = require("../controllers/dashboard");

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
        method: "POST",
        path: "/dashboard/{SubPageName}",
        options: {
          auth: {
            mode: 'required',
          }
      },
        handler: UpdateCurrentSubPage
      },
      // {
      //   method: "GET",
      //   path: "/dashboard/{CurrentSubPage}",
      //   options: {
      //     auth: {
      //       mode: 'required',
      //     }
      // },
      //   handler: GetDashBoard
      // }
    ];

