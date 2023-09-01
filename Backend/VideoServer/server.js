const express = require('express');
const { Server } = require("socket.io")
const http = require('http');
require("dotenv").config()
const cors = require('cors');
const { RoomRouter } = require('./routes/room.routes');
const { client } = require('./db');


const app = express()
app.use(express.json())
app.use(cors())
app.use("/room", RoomRouter) // create & join Room

const httpServer = http.createServer(app)

app.get("/start", async (req, res) => {
    try {
        setTimeout(() => {
            res.status(201).send({ "ok": true, "msg": "Connection Estblished Succesfully" })
        }, 3000);
    } catch (error) {
        res.status(401).send({ "ok": false, "msg": "something went wrong" })
    }
})

//creating Socket server using http server
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
})

io.on("connection", (socket) => {
    socket.on("join-room", (roomID, userID) => {
        console.log(`${userID} Joined the Room ${roomID}`);
        socket.join(roomID)
        socket.to(roomID).emit("user-join", userID)

        socket.on("disconnect", () => {
            socket.to(roomID).emit("user-disconnected", userID)
        })
    })
})


//Checking Redis Error
client.on("error", (err) => {
    console.log("Redis Client Error", err);
})


httpServer.listen(process.env.PORT, async () => {
    try {
        await client.connect()
        console.log("Connected to Redis Succesfully");
    } catch (error) {
        console.log(error);
        console.log("error while connecting to Redis");
    }
    console.log(`server connected at ${process.env.PORT}`);
})