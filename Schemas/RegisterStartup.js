const mongoose = require("mongoose");

const Startup_register_schema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  altmobile: {
    type: String,
  },
  
  residence: {
    type: String,
  },
  permanent: {
    type: String,
  },
  education: {
    type: String,
  },
  aadhar: {
    type: String,
  },
  pan: {
    type: String,
  },
  companyname: {
    type: String,
  },
  corporateemail: {
    type: String,
  },
  businesscategory: {
    type: String,
  },
  businessstage: {
    type: String,
  },
  businessdescription: {
    type: String,
  },
  valuation: {
    type: String,
  },
  noofemployee:{
    type:String
  },
  noofoffices:{
    type:String
  },
  headquarterlocation:{
    type:String
  },
  registrationstatus:{
    type:String
  },
  profitability:{
    type:String
  },
  fundingstatus:{
    type:String
  },
  gst:{
    type:String
  },
  cin:{
    type:String
  },
  bankruptcy:{
    type:String
  },
  noofinvestor:{
    type:String
  },
  last3monrevenue:{
    type:String
  },
  profit3mon:{
    type:String
  },
  pastproceeding:{
    type:String
  },
  password:{
    type:String
  },
    role:{
type:String,
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

module.exports = mongoose.model("startup_register", Startup_register_schema);