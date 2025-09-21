import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path: "./.env"
});
import app from "./app.js"
const PORT = process.env.PORT || 3000


connectDB()
    .then(PORT,()=>{
        console.log(`Example app listening on port ${PORT}`)
    })
    .catch((err)=>{
        console.error("MongoDB connection error:",err)
        process.exit(1)
    })

    app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})