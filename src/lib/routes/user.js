
const Path = require("path");
const {GetUserByID,AuthenticateUser,UpdateUser,AddUser,DeleteUser} = require("../controllers/User/user")
const {GetAllUsers} = require('../controllers/User/management');

module.exports =  [
      {
        method: "GET",
        path: "/user/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetUserByID
      },
      {
        method: "GET",
        path: "/user/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllUsers
      },
      {
        method: "GET",
        path: "/user/{username}:{password}",
        options: {
            auth: {
              mode: 'try',
            }
        },
        handler: AuthenticateUser
      },
      {
        method: "POST",
        path: "/user",
        handler: AddUser,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "PUT",
        path: "/user/{id}",
        handler: UpdateUser,
        options: {
            auth: {
              mode: 'required',
            }
        }
      },
      {
        method: "Delete",
        path: "/user/{id}",
        handler: DeleteUser,
        options: {
            auth: {
              mode: 'required',
            }
        }
      }  
    ];

