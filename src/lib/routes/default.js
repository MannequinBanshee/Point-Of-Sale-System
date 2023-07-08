
const Path = require("path");
const Home = require("../controllers/home")

module.exports =   [

  {
    // Static files
    method: "GET",
    path: "/",
    options: {
      auth: {
        mode: 'try'
      }
    },
    handler: Home
  },
  {
    // Static files
    method: "GET",
    path: "/{Param*}",
    handler: {
      directory: {
        path: Path.join(__dirname, "../../../static/public")
      }
    },
    options: {
      auth: {
        mode: 'try'
      },
      description: "Provides static resources"
    }
  }
  ];
