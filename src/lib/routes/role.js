
const Path = require("path");
const {GetAllRoles,GetRole,GetALLRolesByAuthorityLevel} = require('../controllers/User/management');

module.exports =  [
      {
        method: "GET",
        path: "/role/{id}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetRole
      },
      {
        method: "GET",
        path: "/role/all",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetAllRoles
      },
      {
        method: "GET",
        path: "/role/all/{AuthorityLevel}",
        options: {
            auth: {
              mode: 'required',
            }
        },
        handler: GetALLRolesByAuthorityLevel
      }

]
