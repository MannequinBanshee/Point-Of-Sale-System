// This will load our .env file and add the values to process.env,
require("dotenv").config({ silent: true });

module.exports = {
  env: process.env.NODE_ENV || "development",
  session_secret: process.env.SESSION_SECRET || '5e5a8867efe51312d176633352bc4e098a177e7be6538f077858eed32dfa8596',

  // Environment-dependent settings
  development: {
    db: {
      dialect: "mongodb",
      username: "posmongo1",
      password: "secret",
      address: "127.0.0.1",
      port: "27017",
      database: "POS",
    },
    port: process.env.PORT || 3000,
  },
  production: {
    db: {
      dialect: "sqlite",
      storage: "db/database.sqlite"
    },
    port: process.env.PORT || 4000,
  }

};