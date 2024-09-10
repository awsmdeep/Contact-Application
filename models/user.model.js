import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add ur username"]
    },
    email:{
        type:String,
        required:[true,"please add your email"],
        unique:[true,"email already registered"]
    },
    password:{
        type:String,
        required:[true,"please add the user password"]
    }

},{timestamps:true})

export const User=mongoose.model("User",userSchema)