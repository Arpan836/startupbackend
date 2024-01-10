const mongoose = require("mongoose");

const RightsForRolesSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  rolename: {
    type: String,
  },
  Components:{
    type:[],
  }



});

module.exports = mongoose.model("user_rights", RightsForRolesSchema);
