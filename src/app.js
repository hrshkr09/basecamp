import express from "express"
import cors from "cors"

const app = express()

//cors configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN?.split(",")|| "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"," OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], 
}))

//basic configurations
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
app.use(express.static("public")) 

//import the routes
import healthCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
app.use('/api/v1/healthcheck', healthCheckRouter)
app.use('/api/v1/auth',authRouter)




export default app