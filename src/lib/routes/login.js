
const Path = require("path");
const Login = require("../controllers/login")

module.exports =  [
      {
        method: "GET",
        path: "/login",
        options: {
          auth: false
      },
        handler: Login
      },
      {
        method: "POST",
        path: "/login",
        handler: Login,
        options: {
          auth: {
              mode: 'try'
          }
      }
      }    
    ];

