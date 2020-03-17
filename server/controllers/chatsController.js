const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const {PrivateChats} = require('../models/privateChats')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const pvtfunction= require('../index')

// const client = require('twilio')(accountSid, authToken);
// var ip = require("ip");
function sendToReceiver(res,data){
      console.log('bjhguygugjkhpohl===',data)
    PrivateChats.findById(data.receiverId).exec((err, result)=>{
        if(!result){
            console.log('')
            let privateChats = new PrivateChats({
                _id:data.receiverId,
                chats:[{
                    receiverName:data.senderName,
                    receiverId:data.senderId,
                    messages:[{
                        name:data.senderName,
                        message:data.message,
                    }]
                }]
            })
            privateChats.save().then(receiverData=>{
                console.log('Receiver Send Success',receiverData);
                pvtfunction.viewpvtchat;
                res.status(200).send(receiverData)

                
            })
        }
        else if(result){
            const filtered= result.chats.filter(e=>{
                 return e.receiverId==data.senderId
              })
              console.log('fiyeefd data===>>>',filtered)
              if(filtered.length!==0){
                const prevIndex =  result.chats.findIndex(item=>{
                                   return item.receiverId==data.senderId
                                   })
                 result.chats[prevIndex].messages.push({
                     name:data.senderName,
                     message:data.message,
                 })
                 result.markModified("chats");
                 result.save().then(r=>{
                     pvtfunction.func1();
                    console.log('success purana banda====////',r)
                    res.status(200).send(r)
                 })               
              }
              else if(filtered.length==0){
                  result.chats.push({
                      receiverName:data.senderData,
                      receiverId:data.senderId,
                      messages:[{
                          name:data.senderName,
                          message:data.message,
                      }]
                  })
                  result.markModified("chats");
                  result.save().then(r=>{
                    console.log('success new banda====////',r)
                    pvtfunction.viewpvtchat;
                    res.status(200).send(r)
                    
                  })       
              }
         } 
    })
}
module.exports = {

   
   
   privateMessage(req,res){
       console.log('body....',req.body)
       const {  senderName,
                senderId,
                receiverName,
                receiverId,
                message } = req.body

        PrivateChats.findById(senderId).exec((err, data)=>{
            if(!data){
                console.log('')
                let privateChats = new PrivateChats({
                    _id:senderId,
                    chats:[{
                        receiverName,
                        receiverId,
                        messages:[{
                            name:senderName,
                            message,
                        }]
                    }]
                })
                privateChats.save().then(senderData=>{
                    console.log('Send Success',senderData);
                     sendToReceiver(res,req.body)
                    
                })
            }
           else if(data){
              const filtered= data.chats.filter(e=>{
                   return e.receiverId==receiverId
                })
                if(filtered.length!==0){
                  const prevIndex =  data.chats.findIndex(item=>{
                                     return item.receiverId==receiverId
                                     })
                   data.chats[prevIndex].messages.push({
                       name:senderName,
                       message,
                   })
                   console.log('modified data====>>>',data.chats[prevIndex])
                   data.markModified("chats");
                   data.save().then(r=>{
                    //    console.log('success purana banda====////',r)
                       sendToReceiver(res,req.body)
                       
                    })               
                }
                else if(filtered.length==0){
                    data.chats.push({
                        receiverName,
                        receiverId,
                        messages:[{
                            name:senderName,
                            message,
                        }]
                    })
                    data.markModified("chats");
                    data.save().then(r=>{
                        console.log('success new banda====////',r)
                        sendToReceiver(res,req.body)
                    })       
                }
           } 
        })
   }
   
}