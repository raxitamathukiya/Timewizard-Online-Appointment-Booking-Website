const express=require('express')
require('dotenv').config()
const contectRoute=express.Router()
const {connection}=require('../db')
const {contectModel}=require('../Models/contect.model')

contectRoute.post("/",async()=>{
    try {
       let data=req.body
       let contect=new contectModel(contect)
       await contect.save()
       res.status(200).send({message:"conform"}) 
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    contectRoute
}