"use strict";

const Fs = require("fs");
const Path = require("path");
const Settings = require("../../settings");
const dbSettings = Settings[Settings.env].db;
const winston = require('../../logger');
const mongoose = require("mongoose");
var DBuri = `${dbSettings.dialect}://${dbSettings.username}:${dbSettings.password}@${dbSettings.address}:${dbSettings.port}/${dbSettings.database}?ssl=${dbSettings.ssl}&retrywrites=false&maxIdleTimeMS=120000`;
const Role = require('./role');
const User = require('./user');

 const TestDBConnect = async (error) => {

  winston.info(`Attempting connection to Database.`);
  winston.info(`URI: ${DBuri}`);
    var Connected = false;
    
    const mongoosee = await mongoose.connect(DBuri).catch(error => {
      winston.error(error.message);
    })

    if(mongoosee){
      var dbState = mongoosee.STATES[mongoosee.connection.readyState] 

      if(dbState == mongoosee.STATES[1]){
        Connected = true
      }
      var state = Connected ? "up" : "down";
      winston.info(`Database connection status ${state} and ${dbState}`);

    }

    await PopulateModels();
    await CheckForRootUser();


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

  {AccessName: 'DashBoard',AuthorityLevel: 'Standard'},
  {AccessName: 'DashBoard',AuthorityLevel: 'Administrator'},

  {AccessName: 'Products',AuthorityLevel: 'Standard'},
  {AccessName: 'Products',AuthorityLevel: 'Administrator'}
];


const PopulateModels = async(error) => {

  const mongoosee = await mongoose.connect(DBuri)
  if(mongoosee){
    var dbState = mongoosee.STATES[mongoose.connection.readyState] 
    if(dbState == mongoosee.STATES[1]){

      winston.info('Loading System Data Models');

     Fs.readdirSync(__dirname)
     .filter(file => file.indexOf(".") !== 0 && file !== "index.js")
     .forEach(file => {

       const model = require(Path.join(__dirname, file));
       winston.info(`Loaded Model: ${file.replace('.js','').toUpperCase()}`);

     });
     winston.info('Checking if user account roles are present in DB');
        
     for(const role of Roles){
      var FoundRole = await Role.findOne({'AccessName': role.AccessName, 'AuthorityLevel': role.AuthorityLevel});
      if(!FoundRole){
        winston.info(`Adding Role: ${role.AccessName} ${role.AuthorityLevel}`);
        Role.create(role);
      }
     }
     winston.info('User Account active role check has been completed.');
    }
  }



}

const CheckForRootUser = async(error) =>{

     winston.info('Checking for Root User Account');
      var rootUsername = Settings.rootUser
      var rootPassword = Settings.rootPassword
      var Found = await User.findOne({username: rootUsername})
      var adminRoles = new Array;
      if(!Found){
        winston.info('Root User not Found in DB.');

          var FoundRoles = await Role.find({'AuthorityLevel': "Administrator"});
          if(FoundRoles){
            const RolesArray = Array.from(FoundRoles);
            for(const roleFound of RolesArray){

              adminRoles.push(roleFound._id.toString());

            }

          }
        try{

          winston.info('Creating Root User with Enviroment/Default Variables.');
          User.create({
            username:rootUsername,
            firstname:"root",
            lastname:"user",
            email:"N/A",
            password:rootPassword,
            roles: adminRoles
          });

          winston.info('Root User Created Successfully');
        }
        catch(e){
          throw e;
        }

        return null
      }
     winston.info('Root User Found in DB. Continuing...') 
    return null;
};


const tempadd100clients = async() =>{

  const Client = require('./client');
  const JsBarcode = require('jsbarcode');
  const {createCanvas} = require('canvas');
  const uuid = require('uuid');
  const Barcode = require('./barcode')

for(var i=0; i < 100; i++){

  var firstname = `Client${i}`,
  lastname = `Client${i}`,
  email = `Client${i}@Client${i}.com`,
  cellnumber = `0000000000`,
  idnumber = `0000000000000`,
  balance = i >= 50 ? -i : i;

  var BarcodeCanvas = createCanvas();
  var guid = uuid.v1().substring(0,8);
  JsBarcode(BarcodeCanvas,guid)
  var CreatedBarcode = await Barcode.create({"name": guid});
  const canvasData = BarcodeCanvas.toBuffer("image/png");
  const ServerSidePath = Path.join(__dirname,"../../../static/public/assets/images/Barcodes");
  if(Fs.existsSync(ServerSidePath)){
      Fs.writeFileSync(`${ServerSidePath}/${guid}.png`,canvasData);
  }

  var ReturnBarcode = {"id": CreatedBarcode._id.toString(),"canvasPath":`assets/images/Barcodes/${guid}.png`}
  var phonePattern = RegExp(/\+27[0-9]{9}|0[0-9]{9}/);
  var emailPattern = RegExp(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/);

  Client.create({
  'username':`${firstname}${lastname}`,
  'firstname': firstname,
  'lastname': lastname,
  'email': email != "" ? email.match(emailPattern) ? email : '' : "",
  'password': `${firstname}${lastname}`,
  'cellnumber': cellnumber.match(phonePattern) ? cellnumber : "",
  'identitynumber': idnumber == "" ? 0 : parseInt(idnumber),
  'balance': balance == "" ? 0 : parseFloat(balance),
  'barcode': ReturnBarcode.id
  });
  
}

}

module.exports = {
  TestDBConnect,
  PopulateModels,
  CheckForRootUser,
  tempadd100clients
}
