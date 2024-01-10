
const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const cookieParser=require('cookie-parser')

const mongoURI = require('./config/monkoKEY');
const routes=require('./Routes')
require('dotenv').config()
const app=express()
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    credentials:true,
    origin:'http://localhost:4200'
}))

app.use(routes)

mongoose.connect(mongoURI, 
    { useNewUrlParser: true,
         useUnifiedTopology: true, 
         useFindAndModify: false,
          useCreateIndex: true, },).then(() =>
 console.log("Connected !"),);

const PORT = process.env.PORT || 8000;

const server=app.listen(PORT, () => console.log("Server Started At " + PORT));

const dbConnect = require('./db')
dbConnect()
