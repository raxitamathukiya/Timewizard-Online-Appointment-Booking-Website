const express = require("express");
const { testModel } = require("../model/test");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const authRoute = express.Router();
const passport = require("passport"); 
var userProfile
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
// const idnex= require("../dashboard.html")
const { usermodel } = require("../model/user.model");

//google outh
authRoute.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
authRoute.get(
  "/auth/google/callback",
  passport.authenticate('google', {
    successRedirect: '/auth/google/success',
    failureRedirect: '/google/failure',
    session: false

  })
);
authRoute.get('/auth/google/success', (req, res) => {
  console.log("dashboard") 
  console.log(userProfile)  
  res.send('google auth success') 
  //res.send(userProfile)
  //res.redirect("")
 // res.send(userProfile)
  //res.sendFile(__dirname+ "C:\Users\Dell\Desktop\chummy-run-6992\Backend\Authentication\view\dashboard.html") 
  //res.send("successfully login",userProfile) 
  //res.redirect("/") 
  //res.redirect('/success');
}) //
authRoute.get('/profile', (req, res) => res.send(userProfile));
const GOOGLE_CLIENT_ID = "993273098507-li9fto57832qa3l9vu8gf2jjcncra4d1.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET = "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"
passport.use(

  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) { 
      userProfile=profile
      let email = profile._json.email;
      let name = profile._json.name;
      const user = new testModel({ email, name }); 
      console.log(user);
    
      await user.save();
      return done(null, user);
    }   
  )

);

authRoute.get('/auth/github/success', (req, res) => {
  //console.log("dashboard") 
  res.send("github auth successful") 
  //res.sendFile(__dirname+ "/../view/dashboard.html")
  
})

// github auth

authRoute.get("/auth/github", async (req, res) => {
  const code = req.query.code;
  const accessToken = await fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code: code
    })
  }).then((res) => res.json())
  // console.log(accessToken);

  const user = await fetch(`https://api.github.com/user`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken.access_token}`
    }
  })
    .then((res) => res.json());
  console.log(user);
  res.send("Authentication successfull");
})





// var GitHubStrategy = require('passport-github2').Strategy;

// passport.use(new GitHubStrategy({
//   clientID: process.env.GITHUB_CLIENT_ID,
//   clientSecret: process.env.GITHUB_CLIENT_SECRET,
//   callbackURL: "https://realtalk-xptc.onrender.com/auth/github/callback"
// },
//   async function (request, accessToken, refreshToken, profile, done) {
//     let email = profile._json.email;
//     let name = profile._json.name;
//     const user = new testModel({ email, name });
//     await user.save();
//     return done(null, user);
//     //   console.log(profile);
//   }
// ));

// authRoute.get('/auth/github',
//   passport.authenticate('github', { scope: ['user:email'] }));

// authRoute.get('/auth/github/callback',
//   passport.authenticate('github', {
//     successRedirect: '/auth/github/success',
//     failureRedirect: '/github/failure',
//     session: false

//   })
// );

// authRoute.get('/auth/github/success', (req, res) => {
//   res.send("Github page")
// })

// passport.use(
//     new GitHubStrategy(
//       {
//         clientID: process.env.GITHUB_CLIENT_ID,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET,
//         callbackURL: "https://realtalk-xptc.onrender.com/auth/github/callback",
//         scope: "user:email",
//       },
//       async function (accessToken, refreshToken, profile, done) {
//         let email = profile.emails[0].value;
//         let udata = await usermodel.findOne({ email });
//         if (udata) {
//           return done(null, udata);
//         }
//         let name = profile._json.name;
//         let N = name.trim().split(" ");
//         let logo = N[0][0] + N[N.length - 1][0];
//         const user = new usermodel({
//           name,
//           logo,
//           email,
//           password: uuidv4(),
//         });
//         await user.save();
//         return done(null, user);
//         console.log(profile);
//       }
//     )
//   );

module.exports = {
  authRoute
};