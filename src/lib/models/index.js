"use strict";

const Fs = require("fs");
const Path = require("path");
const Settings = require("../../settings");
const dbSettings = Settings[Settings.env].db;
const winston = require('../../logger');
const mongoose = require("mongoose");
var DBuri = `${dbSettings.dialect}://${dbSettings.username}:${dbSettings.password}@${dbSettings.address}:${dbSettings.port}/${dbSettings.database}`;
const Role = require('./role');

 const TestDBConnect = async (error) => {

  winston.info(`Attempting connection to Database.`);

    var Connected = false;
    
    const mongoosee = await mongoose.connect(DBuri).catch(error => {
      winston.error(error.message);
    })

    var dbState = mongoosee.STATES[mongoosee.connection.readyState] 

    if(dbState == mongoosee.STATES[1]){
      Connected = true
    }
    var state = Connected ? "up" : "down";
    winston.info(`Database connection status ${state} and ${dbState}`);

    await PopulateModels();

    return { 
      State: state, 
      DBState: dbState
   }

}
  
const Roles = [
  {AccessName: 'Accounts',AuthorityLevel: 'Standard'},
  {AccessName: 'Accounts',AuthorityLevel: 'Administrator'},

  {AccessName: 'StockTake',AuthorityLevel: 'Standard'},
  {AccessName: 'StockTake',AuthorityLevel: 'Administrator'},

  {AccessName: 'UserManagement',AuthorityLevel: 'Standard'},
  {AccessName: 'UserManagement',AuthorityLevel: 'Administrator'},

  {AccessName: 'Settings',AuthorityLevel: 'Standard'},
  {AccessName: 'Settings',AuthorityLevel: 'Administrator'},

  {AccessName: 'StockTake',AuthorityLevel: 'Standard'},
  {AccessName: 'StockTake',AuthorityLevel: 'Administrator'},

  {AccessName: 'DashBoard',AuthorityLevel: 'Standard'},
  {AccessName: 'DashBoard',AuthorityLevel: 'Administrator'},

  {AccessName: 'Products',AuthorityLevel: 'Standard'},
  {AccessName: 'Products',AuthorityLevel: 'Administrator'}
];



const PopulateModels = async(error) => {

  await mongoose.connect(DBuri).then(mongoose => {

    var dbState = mongoose.STATES[mongoose.connection.readyState] 
    if(dbState == mongoose.STATES[1]){

      winston.info('Loading System Data Models');

     Fs.readdirSync(__dirname)
     .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
     .forEach(file => {

       const model = require(Path.join(__dirname, file));
       winston.info(`Loaded Model: ${file.replace('.js','').toUpperCase()}`)

     });

     winston.info('Checking if user account roles are active');
        
      Roles.forEach(async role =>{
        var FoundRole = await Role.findOne({'AccessName': role.AccessName, 'AuthorityLevel': role.AuthorityLevel});
       if(!FoundRole){
         winston.info(`Adding Role: ${role.AccessName} ${role.AuthorityLevel}`);
         Role.create(role);
       }

     });
     winston.info('User Account active role check has been completed.') 

    }})

}

module.exports = {
  TestDBConnect,
  PopulateModels
}
