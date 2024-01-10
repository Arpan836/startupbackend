
function dbConnect() {
    // Db connection
const mongoose = require('mongoose')
const mongoURI = require('./config/monkoKEY.js');


mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})
mongoose.connection
    .once('open', function () {
      console.log('MongoDB running');
    })
    .on('error', function (err) {
      console.log(err);
    });
// const connection = mongoose.connection
// connection.once('open', function() {
//     console.log('Database connected...')
// }).catch(function(err){
//     console.log('Connection failed...')
// })
}

module.exports = dbConnect