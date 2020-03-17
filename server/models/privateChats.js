const mongoose = require('mongoose');
// const moment = require("moment");

const privateChats = mongoose.Schema({
   chats:Array
   
})



const PrivateChats = mongoose.model('PrivateChats', privateChats);

module.exports = { PrivateChats }