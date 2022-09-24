
const Path = require("path");
const {GetClientByID,UpdateClient,AddClient,DeleteClient} = require("../controllers/User/client")
const {GetAllClients} = require('../controllers/User/management');

module.exports =  [
      {
        method: "GET",
        path: "/client/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetClientByID
      },
      {
        method: "GET",
        path: "/client/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllClients
      },
      {
        method: "POST",
        path: "/client",
        handler: AddClient,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "PUT",
        path: "/client/{id}",
        handler: UpdateClient,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "Delete",
        path: "/client/{id}",
        handler: DeleteClient,
        options: {
            auth: {
              mode: 'required',
            }
        }
      }  
    ];

