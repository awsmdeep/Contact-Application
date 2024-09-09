import express from "express"
import dotenv from "dotenv"
import router from "./routes/contact.route.js";

const app=express();
dotenv.config()

const port=process.env.PORT||3000


app.use("/api/contacts",router)




app.listen( port,()=>{
    console.log(`listening at port ${port}`);
    
})