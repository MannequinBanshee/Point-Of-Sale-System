// This will load our .env file and add the values to process.env,
require("dotenv").config({ silent: true });

module.exports = {
  env: process.env.NODE_ENV || "development",
  session_secret: process.env.SESSION_SECRET || '5e5a8867efe51312d176633352bc4e098a177e7be6538f077858eed32dfa8596',
  rootUser: process.env.APPROOTUSERNAME || "root",
  rootPassword: process.env.APPROOTPASSWORD || "secret",

  // Environment-dependent settings
  development: {
    db: {
      dialect: "mongodb",
      username: process.env.MONGODB_ROOT_USERNAME,
      password: process.env.MONGODB_ROOT_PASSWORD,
      address: process.env.DEV_DB_ADDRESS,
      port: process.env.DEV_DB_PORT,
      database: process.env.MONGODB,
      ssl: process.env.ENABLE_DB_SSL
    },
    port: process.env.DEV_PORT || 3000
  },
  production: {
    db: {
      dialect: "mongodb",
      username: process.env.MONGODB_ROOT_USERNAME,
      password: process.env.MONGODB_ROOT_PASSWORD,
      address: process.env.PROD_DB_ADDRESS,
      port: process.env.PROD_DB_PORT,
      database: process.env.MONGODB,
      ssl: process.env.ENABLE_DB_SSL
    },
    port: process.env.PROD_PORT || 80
  }

};