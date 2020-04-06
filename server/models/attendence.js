const mongoose = require('mongoose');
const moment = require("moment");

const attendenceSchema = mongoose.Schema({
   date:{
       type:String,
       default:moment().format("dddd, Do MMM YYYY")
   },
   employees:Array  
})



const Attendence = mongoose.model('Attendence', attendenceSchema);

module.exports =  Attendence 