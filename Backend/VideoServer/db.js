const { createClient } = require("redis")

require("dotenv").config()

const client = createClient({
    url: process.env.REDIS_URL
});


// const configuration = {
//     port: 19442, // Redis port
//     host: "redis-19442.c212.ap-south-1-1.ec2.cloud.redislabs.com", // Redis host
//     username: "default", // needs Redis >= 6
//     password: process.env.REDIS_PASSWORD,
// }
// const client = new Redis(configuration)

module.exports = { client }