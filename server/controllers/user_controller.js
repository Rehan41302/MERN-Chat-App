const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user')
const Attendence = require('../models/attendence')
const PrivateChats = require('../models/privateChats')
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const moment = require('moment')
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// const client = require('twilio')(accountSid, authToken);
// var ip = require("ip");
module.exports = {

    getUsers(req, res){
        User.find().exec((err,data)=>{
            if(err){
                console.log(err.message)
                
            }
            else{
                console.log('Success',data)
                res.status(200).send(data)
            }
        })
    },


    register(req, res){
         // Form validation
        const { errors, isValid } = validateRegisterInput(req.body);
        // Check validation
            if (!isValid) {
            return res.status(400).json(errors);
            console.log('isValid bad: ',errors);      
            }
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
              return res.status(400).json({ email: "Email already exists" });
            console.log('findOne bad: ');
            
            } else {
              const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
              });
        // Hash password before saving in database
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.status(200).json(user))
                    .catch(err => console.log(err));
                });
              });
            }
          }).catch(err=> console.log(err));
        },

    login(req, res){
        // console.log('Login: ',req)
            // Form validation
            const { errors, isValid } = validateLoginInput(req.body);
            // Check validation
            if (!isValid) {
                return res.status(400).json(errors);
            }
            const email = req.body.email;
            const password = req.body.password;
            // Find user by email
            User.findOne({ email }).then(user => {
                // Check if user exists
                if (!user) {
                return res.status(404).json({ emailnotfound: "Email not found" });
                }
               

            // Check password
                bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    console.log("userID: ",user.id)
        
                    user.update({status:"online"}).then(res=>{
                        console.log('succcess online---')
                        var currentData = moment().format("dddd, Do MMM YYYY")
                        let loginDetails={
                            _id:user._id,
                            name:user.name,
                            loginTime:moment().format("h:mm:ss a"),
                            logoutTime:''
                        }
                        Attendence.findOne({date:currentData}).exec((err,result)=>{
                            if(!result){
                                let attendence = new Attendence({
                                    date:currentData,
                                    employees:[loginDetails]
                                })
                                attendence.save().then(checkIn=>{
                                    console.log('New date Attend success===>>>',checkIn)
                                }).catch(err=>console.log('New attend error===>>',err.message))
                            }
                            else if(result){
                             const filtered = result.employees.filter(e=>{
                                                return e._id == user._id 
                                              })
                                if(filtered.length==0){
                                    result.employees.push(loginDetails)
                                    result.markModified('employees');
                                    result.save().then((data)=>{
                                        console.log('Updated Attendence==>>',result)
                                    })
                                }
                            }
                        })
                    })

                    // User matched
                    // Create JWT Payload
                    const payload = {
                    id: user.id,
                    name: user.name,
                    email:user.email,
                    userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 57600//16 hours               31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                        success: true,
                        token: "Bearer " + token
                        });
                    }
                    );
                } else {
                    return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
                }
                });
            });
    },

  
    logout(req, res){
        const {id}=req.body;
        console.log('REquest body id===',req.body)
        User.findById(id).exec((err,result)=>{
            if(err){
                console.log('Error from logout:',err.message)
                return res.status(404).send(err.message)
                
            }
            else{
                result.updateOne({status:'offline'}).then(data=>{
                console.log('Result:..',result)
                res.status(200).send({success:true})
            }).catch(err=>console.log*(err.message))
            }

        })
    },

    authGoogleCallback(req,res){
        // var token = req.user.token;
        console.log('res.user>>>=====',req.user)
        User.findOne({email:req.user.email}).exec((err,user)=>{
            if(user){
                console.log('Gmail Already Exist',user)
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    // userType: user.userType
                    };
            // Sign token
                    jwt.sign(
                    payload,
                    process.env.secretOrKey,
                    {
                        expiresIn: 57600 // 1 year in seconds
                    },
                    (err, token) => {
                        res.redirect("http://localhost:3000?token=" + token);
                        // res.json({
                        // success: true,
                        // token: "Bearer " + token
                        // });
                    }
                    );
            }
            else if(!user){
                const newUser = new User({
                    name: req.user.name,
                    email: req.user.email,
                    password: `#Pael526${req.user.email}q1w2e3zaxscd`,
                  });
            // Hash password before saving in database
                  bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;
                      newUser
                        .save()
                        .then((user) =>{ 
                            const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            // userType: user.userType
                            };
                    // Sign token
                            jwt.sign(
                            payload,
                            process.env.secretOrKey,
                            {
                                expiresIn: 57600 // 1 year in seconds
                            },
                            (err, token) => {
                                res.redirect("http://localhost:3000?token=" + token);

                                // res.json({
                                // success: true,
                                // token: "Bearer " + token
                                // });
                            }
                            )}
                            )
                        .catch(err => console.log(err));
                    });
                  });
            }
        })
        // res.redirect("http://localhost:3000?token=" + token);

    }
}