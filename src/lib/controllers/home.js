"use strict";
const winston = require('../../logger');

module.exports = async (req, h) => {

    return h.redirect("/login");
    
};