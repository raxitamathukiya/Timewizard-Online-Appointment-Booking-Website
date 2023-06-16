const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { usermodel } = require("../model/user.model");
const { client } = require("../config/db");
const { authorization } = require("../middleware/token.middleware");
require("dotenv").config();


const userrouter = express.Router();

// Sign in part is hare ...............................

userrouter.post("/sign", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const auser = await usermodel.findOne({ email });

    if (auser) {
     return res.send({ "ok": false, "msg": "User Already exist" });
    } else{
      const hash = bcrypt.hashSync(password,3);
      const user =await new usermodel({ name, email, password: hash });
         await user.save(); 
         res.send({"ok":true ,"msg": "Registration Successfull" }); 
    }
  //   //else {
    //  const hash =  bcrypt.hashSync(password, 5); 
    //     // if (err) {
    //     //    res.send({"ok":false, "err": "Something went wrong while hashing" });
    //     //  }
         
    //     const user = new usermodel({ name, email, password: hash });
    //     await user.save(); 
         


    //     res.send({"ok":true ,"msg": "Registration Successfull" }); 
         
    // });
    
  
  } catch (err) {
    res.send({ mes: err.message });
  } 
//   try {
//     const {name,email,password}=req.body;
//     const isUserPresent = await usermodel.findOne({email});
//     if(isUserPresent) return res.status(200).send("User already exists! Please Login!")

//     const hash = await bcrypt.hash(password,3);

//     const newUser = new usermodel({name,email,password:hash});

//     await newUser.save();

//     res.status(200).send("SignUp Sucessful")

    
// } catch (error) {
//     res.status(400).send({"msg":error.message})
// }
});


//  login part is hare ..............................

userrouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usermodel.findOne({ email });
    console.log(user);
    if (!user) {
      res.send({"ok":false, "msg": "User Not found, Please Register First" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "30m",
          });

          res.send({
            "ok":true,
            "msg": "login successfully",
            "user_details": { name: user.name, email: user.email },
            "token": token
          });
        } else {
          res.send({"ok":false,"msg":"Wrong Credentials"});
        }
      });
    }
  } catch (err) {
    res.send({ "msg": err.message });
  }
});


userrouter.post("/logout", async(req,res)=>{
  try {
    const token  = req.headers.authorization;
    await client.set(`${token}`,`${true}`);
    
    await client.expire(`${token}`, 60*60);

    res.send({"ok":true, "msg":"Logout Successfull"});
    
  } catch (error) {
    res.send({"ok":false, "msg":error.message});
  }
})

userrouter.post("/check", authorization, (req,res)=>{
  res.send({"ok":true,"msg":"user loggedin"})
})


module.exports = { userrouter };