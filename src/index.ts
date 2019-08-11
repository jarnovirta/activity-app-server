import express from "express";
const app = express();
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import loginRouter from "./controllers/login"
import stravaAuthRouter from "./controllers/strava-auth"
import userRouter from "./controllers/users"
import config from "./utils/config"

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })
    .then(() => {
        console.log("connected to database", config.mongoUrl)
    })
    .catch((err) => {
        console.log(err)
    })

app.use(cors())
app.use(bodyParser.json())
app.use(express.static("build"))
app.use("/api/stravaauth", stravaAuthRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

const server = http.createServer(app)

server.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`)

})
server.on("close", () => {
    mongoose.connection.close()
})

module.exports = {
    app, server
}
