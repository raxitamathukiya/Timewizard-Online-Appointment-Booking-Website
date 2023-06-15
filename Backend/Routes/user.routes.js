const express = require("express");
const UserRouter = express.Router();

UserRouter.get("/lists",async(req,res)=>{
    res.status(200).send("List of users End point");
})