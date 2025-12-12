import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";

const app = express();

app.use(express.json({limit : "4kb"}));
app.use(cookieParser());

const port = 8000;

app.get("/status", (req , res)=>{
    
    console.log("server is ok")
    res.send("hello from server")

})

await connectDB();

app.listen(process.env.PORT || port , ()=>{
    console.log(`server started at port ${port}`)
})
