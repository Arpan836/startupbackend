const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema_Startup = require("./Schemas/RegisterStartup");
const RightsForRoles=require("./Schemas/RightsForRoles")
const nodemailer = require("nodemailer");
const csc = require("country-state-city");
// const LocalStorage = ('node-localstorage');

const CsvParser = require("json2csv").Parser;

const router = express.Router();
//excel file Reports route
router.get("/exportuser", async (req, res) => {
  try {
    let users = [];
    var userData = await Schema_Startup.find({});
    userData.forEach((user) => {
      const { _id, firstname, lastnamename, email } = user;
      users.push({ _id, firstname, lastnamename, email });
    });
    const csvfields = ["Id", "FirstName", "lastName", "Email"];
    const csvParser = new CsvParser({ csvfields });
    const csvdata = csvParser.parse(users);
    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attatchment:filename=userData.csv");
    res.status(200).end(csvdata);
  } catch (error) {
    res.send({ status: 400, success: false, msg: error.message });
  }
});

router.post("/registerstartup", async (req, res) => {
  // let fname = req.body.firstname;
  // let lname = req.body.lastname;
   let email = req.body.email;
  let firstname=req.body.firstname;
let lastname=req.body.lastname;
let gender=req.body.gender;
let dob=req.body.dob;
let mobile=req.body.mobile;
let altmobile=req.body.altmobile;
let residence=req.body.residence;
let permanent=req.body.permanent;
let education=req.body.education;
let aadhar=req.body.aadhar;
let pan=req.body.pan;
let companyname=req.body.companyname;
let corporateemail=req.body.corporateemail;
let businesscategory=req.body.businesscategory;
let businessstage=req.body.businessstage;
let businessdescription=req.body.businessdescription;
let valuation=req.body.valuation;
let noofemployee=req.body.noofemployee;
let noofoffices=req.body.noofoffices;
let headquarterlocation=req.body.headquarterlocation;
let registrationstatus=req.body.registrationstatus;
let profitability=req.body.profitability;
let fundingstatus=req.body.fundingstatus;
let gst=req.body.gst;
let cin=req.body.cin;
let bankruptcy=req.body.bankruptcy;
let noofinvestor=req.body.noofinvestor;
let last3monrevenue=req.body.last3monrevenue;
let profit3mon=req.body.profit3mon;
let pastproceeding=req.body.pastproceeding;
  const salt = await bcrypt.genSaltSync(10);

  let password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, salt);
  const Startup_register = new Schema_Startup({
    // firstname: fname,
    // lastname: lname,
  email: email,
 
firstname:firstname,
lastname:lastname,
gender:gender,
dob:dob,
email: email,
mobile:mobile,
altmobile:altmobile,
residence:residence,
permanent:permanent,
education:education,
aadhar:aadhar,
pan:pan,
companyname:companyname,
corporateemail:corporateemail,
businesscategory:businesscategory,
businessstage:businessstage,
businessdescription:businessdescription,
valuation:valuation,
noofemployee:noofemployee,
noofoffices:noofoffices,
headquarterlocation:headquarterlocation,
registrationstatus:registrationstatus,
fundingstatus:fundingstatus,
gst:gst,
cin:cin,
bankruptcy:bankruptcy,
noofinvestor:noofinvestor,
last3monrevenue:last3monrevenue,
profit3mon:profit3mon,
pastproceeding:pastproceeding,
    role: "3",
    //  password:hashedPassword
    password: hashedPassword,
  });
  const record = await Schema_Startup.findOne({ email: email });
  if (record) {
    return res.status(404).end("email exists");
  } else {
    const result = await Startup_register.save();

    res.json({
      Startup_register: result,
    });
  }
});

router.post("/registerinvestor", async (req, res) => {
  let fname = req.body.firstname;
  let lname = req.body.lastname;
  let email = req.body.email;
  const salt = await bcrypt.genSaltSync(10);

  let password = req.body.password;
  const hashedPassword = await bcrypt.hash(password, salt);
  const Startup_register = new Schema_Startup({
    firstname: fname,
    lastname: lname,
    email: email,
    role: "4",
    //  password:hashedPassword
    password: hashedPassword,
  });
  const record = await Schema_Startup.findOne({ email: email });
  if (record) {
    return res.status(404).end("email exists");
  } else {
    const result = await Startup_register.save();

    res.json({
      Startup_register: result,
    });
  }
});

// router.get("/register", async (req, res) => {
//   res.json(csc.Country.getAllCountries());
// });

router.post("/login", async (req, res) => {
  try {
    let username = req.body.username;
    let pass = req.body.password;
    const record = await Schema_Startup.findOne({ email: username });
    if (!record) {
      return res.status(401).send({ message: "not exist" });
    } else {
      if (!(await bcrypt.compare(pass, record.password))) {
        return res.status(401).send({ message: "invalid credential" });
      }

      const token = await jwt.sign(
        { _id: record._id, role: record.role },
        "secret"
      ); //secret key env
      res.cookie("jwttoken", token, {
        httpOnly: true,
        // secure:false, when production true
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.json({
        Startup_register: token,
      });
    }
  } catch (error) {
    console.log(error)
    return res.status(401).send({ message: "unauthenticated" });
  }
});
// const cookie=req.cookies['jwt']
// const claims=jwt.verify(cookie,"secret")
// if(!claims){
//   return res.status(401).send({message:"unauthenticated"})
// }
// const user=await Schema_Startup.findOne({_id:claims._id})
// const {password,...data}=await user.toJSON()
// res.send(data)
// }
// catch(error){
//   return res.status(401).send({message:"unauthenticated"})

// }
// });
// router.get("/countries", async (req, res) => {
//   res.json(csc.Country.getAllCountries());
// });

router.get("/user", async (req, res) => {
  //try{
  try {
    const cookie = req.cookies['jwttoken']

    
  const claims=jwt.verify(cookie,"secret")
  if(!claims){
    return res.status(401).send({message:"unauthenticated"})
  }
  const user=await Schema_Startup.findOne({_id:claims._id})
  const {password,...data}=await user.toJSON()

  res.send(user)
  }
  catch(error){

  console.log(error)

  }
});
router.get("/logout", async (req, res) => {
  res.clearCookie('jwttoken');
  res.send({message:"logout success"})
  // res.cookie("jwttoken", "", { maxAge: 0 });
  // res.send("token expired");
});

router.get("/contact_us", (req, res) => {
  // instantiate the SMTP server

  const smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // company's email and password
      user: "arpanrajput785@gmail.com",
      pass: "uxhyjlpxgwdqgeab",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // email options
  const mailOpts = {
    from: "arpanrajput785@gmail.com",
    to: "arpanrajput785@gmail.com",
    // subject: `Enquiry from ${req.body.name}`,
    subject: `Enquiry from Arpan`,

    html: `
      <div>
      <h2 style="color: #478ba2; text-align:center;">Client's name: Arpan</h2>
      <h3 style="color: #478ba2;">Client's email: arpanrajput785@gmail.com<h3>
      </div>
      <h3 style="color: #478ba2;">Client's message: </h3>
      <div style="font-size: 30;">
this is a test mail
      </div>
      `,

    // attachments: [
    //   {
    //     // filename: `${req.body.myfile}`,
    //   },
    // ],
  };

  // send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      res.json(error);
    } else {
      res.json(response);
    }
  });
});



router.get("/allprofile", async (req, res) => {
  try {
    const cookie = req.cookies['jwttoken']

  const claims=jwt.verify(cookie,"secret")
  const user=await Schema_Startup.find({role:claims.role,approved:false})
  if(user){
    res.send(user)
  }
  else{
    res.send("not found")
  }


  }
  catch(error){

  }
})

router.get("/approvedstartup", async (req,res)=>{
  try{
    const cookie = req.cookies['jwttoken']

    const claims=jwt.verify(cookie,"secret")
    const user=await Schema_Startup.find({role:claims.role,approved:true})
    if(user){
      res.send(user)
    }
    else{
      res.send("not found")
    }
  
  }
  catch(error){

  }
})



router.get("/rights/:role", async (req, res) => {
  const user=await RightsForRoles.find({role:req.params.role})
if(user)
{
res.json(user)
}
else{
  res.send(" not success")

}
});
module.exports = router;
