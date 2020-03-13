const mongoose = require('mongoose');
// const moment = require("moment");

const chatSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    id: {
        type:String,
        // trim:true,
        // unique: 1 
    },

    message:{
        
    },
    image:String,
})



const Chats = mongoose.model('Chat', chatSchema);

module.exports = { Chats }