const express=require('express')
require('dotenv').config()
const appointmentRoute=express.Router()
const {connection}=require('../db')
const {AppointmentModel}=require('../Models/appointment.model')

appointmentRoute.post("/date",async()=>{
    try {
       let date=req.body
       let data=new AppointmentModel(date)
       await data.save()
       res.status(200).send("succesfully done") 
    } catch (error) {
        console.log(error)
    }
})

module.exports={
    appointmentRoute
}