const mongoose = require("mongoose");

  const RoleSchema = new mongoose.Schema({
    AccessName: {
      type: String,
      required: true,
    },
    AuthorityLevel: {
      type: String,
      required: true,
    }
  });

module.exports = mongoose.model("Role", RoleSchema);


