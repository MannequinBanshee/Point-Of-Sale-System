
const Path = require("path");
const Dashboard = require("../controllers/dashboard");

module.exports =  [
      {
        method: "GET",
        path: "/dashboard",
        options: {
          auth: {
            mode: 'required',
          }
      },
        handler: Dashboard
      },
      {
        method: "POST",
        path: "/dashboard",
        handler: Dashboard,
        options: {
          auth: {
              mode: 'required'
              }
      }
      }    
    ];

