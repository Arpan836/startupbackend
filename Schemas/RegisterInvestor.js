const mongoose = require("mongoose");

const investor_register_schema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
  },
  password:{
    type:String
  },
  Approved:{
    type:Boolean,
    default:false
  },
  Rejected:{
    type:Boolean,
    default:false
  }


});

module.exports = mongoose.model("investor_register", investor_register_schema);
