"use strict";
const Path = require("path");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Hapi = require('@hapi/hapi');
const Cookie = require('@hapi/cookie');
const Settings = require('./src/settings');
const winston = require('./src/logger');
const moment = require('moment');
const Routes = require('./src/lib/routes')
const { validateCookie } = require('./src/lib/controllers/User/user');
const Models = require('./src/lib/models');
// let CurrentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

const init = async () => {

    const server = new Hapi.Server({ 
        port: Settings[Settings.env].port,
        routes:{
            files: {
                relativeTo: Path.join(__dirname, '/static/public')
            }
        } 
    });
    await server.register([Inert,Vision,Cookie]);

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: 'Authentication',
            password: '!wsYhFA*C2U6nz=Bu^%A@^F#SF3&kSR6',
            isSecure: Settings.env === "production"
        },
        redirectTo: '/login',
        validateFunc: validateCookie
    });

    server.auth.default('session');
    
    server.views({
        engines: { ejs: require("ejs") },
        path: Path.join(__dirname, "/src/lib/views"),
        compileOptions: {
          pretty: false
        },
        isCached: Settings.env === "production"
      });


    await Models.TestDBConnect();

    server.route(Routes);
    await server.start();
    winston.info(`Server running in ${Settings.env} mode on : ${server.info.address}:${server.info.port}`);
};


process.on("unhandledRejection", err => {
    try{
        winston.error(err);
    }
    catch{
    console.log(err)
    }

    process.exit(err.code);
  });

  init();