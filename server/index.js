require('dotenv').config();
const express = require('express');
const path = require("path");
const http = require("http");
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userController = require('./controllers/user_controller')
const chatsController = require('./controllers/chatsController')



const socketIO = require("socket.io");
const {Chats} = require("./models/chat")
const {PrivateChats} = require('./models/privateChats')
// const passport = require("passport");


// const socket = require('socket.io')
const server = http.createServer(app);
const io = socketIO(server);




//IMAGE UPLOAD CONFIGURATION
const multer = require("multer");
const storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, 'server/uploads/');
},
filename: function(req, file, callback) {
  console.log("storage====",file)
callback(null, Date.now() + file.originalname);
}
});
const imageFilter = function(req, file, cb) {
// accept image files only
console.log("ImageFilter====",file)
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
return cb(new Error("Only image files are accepted!"), false);
}
cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter});//{ storage: storage, fileFilter: imageFilter}, fileFilter: imageFilter 
// const cloudinary = require("cloudinary");
// cloudinary.config({
// cloud_name: "dbevearco", //ENTER YOUR CLOUDINARY NAME
// api_key: process.env.CLOUDINARY_API_KEY, // THIS IS COMING FROM CLOUDINARY WHICH WE SAVED FROM EARLIER
// api_secret: process.env.CLOUDINARY_API_SECRET // ALSO COMING FROM CLOUDINARY WHICH WE SAVED EARLIER
// });


app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );


app.use(bodyParser.json());
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log('Database Connection Err-------------:',err.message);
        
    }
    else
    console.log('Database Connected-------------');
});

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie: {
        maxAge: 1000*60*60*24*17
    }
}));

app.use(cors());

// app.use(passport.initialize()); 
// require("./config/passport");



//=====================================//
//        SOCKET IO WORKING......      //
//=====================================//

var users={}
io.on("connection", socket => {
  
  console.log("New client connected" + socket.id);
  // console.log('socket users===',io.sockets.sockets)
  socket.on("Chat", (data) => {
      console.log('initial data called by client=====',data)
         
            let newUser= new Chats({
              name:data.name,
              id:data.id,
              message:data.message,
              image:data.image
            })
            newUser.save().then(res=>{
              viewChats()
              
            }).catch(err=>{console.log('chat message===>>>',err.message)})
     

   });
   exports.func1 = function (){
       console.log('called vew pvt==///');
        socket.emit("call_pvt_data")
     }
  //   {func1:function (){
  //    console.log('called vew pvt==///');
  //     socket.emit("call_pvt_data")
  //  }}

   socket.on("get_pvt_chats",(id)=>{
     console.log('Pvt called==>>>',id)
     PrivateChats.find().exec((err,data)=>{
        if (err){return console.log('Not found ', err.message)}
        else {
         console.log('pvt data',data)
          io.sockets.emit("pvt_chats",data)
        }
      })
   })
   socket.on("view-chats",()=>{
      viewChats()
  })

   function viewChats(){
    Chats.find({}).then(docs => {
      console.log('emitted data====',docs)
      io.sockets.emit("get_chats", docs);
  });
   }
})













setTimeout(()=>{
    // app.get("/viewImages", (req, res) => {
    //     Image.find(function(err, images) {
    //       if (err) {
    //         res.json(err.message);
    //       } else {
    //         res.json(images);
    //       }
    //     });
    //   });
      
    //   app.post("/add", upload.single("image"), (req, res) => {
    //       console.log('/add called====',req.body)
    //     cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
    //       if (err) {
    //         req.json(err.message);
    //       }
    //       req.body.image = result.secure_url;
    //       // add image's public_id to image object
    //       req.body.imageId = result.public_id;
      
    //       Image.create(req.body, function(err, image) {
    //         if (err) {
    //           res.json(err.message);
    //           return res.redirect("/viewImages");
    //         }
    //         console.log('res send',image)
    //         res.json(image)
    //       });
    //     });
    //   });
  

    /* -----------GET Google Authentication API.----------- */
        // app.get(
        //   "/auth/google",
        //   passport.authenticate("google", { scope: ["profile", "email"] })
        // );
        // app.get(
        //   "/auth/google/callback",
        //   passport.authenticate("google", { failureRedirect: "/", session: false }),userController.authGoogleCallback);
          // function(req, res) {
          //     var token = req.user.token;
          //     console.log('res.user>>>=====',req.user)
          //     res.redirect("http://localhost:3000?token=" + token);
          // }
        // );

         app.post('/api/login',userController.login);
         app.post('/api/users',userController.getUsers);
         app.post('/api/privateMessage',chatsController.privateMessage);

    




},200);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server Running at ${port}`)
});