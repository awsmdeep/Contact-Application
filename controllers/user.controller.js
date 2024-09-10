import asyncHandler from "express-async-handler";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("please fill the full form");
  }
  const userAvaiable = await User.findOne({ email });
  if (userAvaiable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashpassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.id });
  } else {
    res.status(400);
    throw new Error("User Data is not Valid");
  }
});

export const login = asyncHandler(async (req, res) => {
  const {email,password} =req.body;
  if(!email || !password){
    res.status(400);
    throw new Error("all fields are mandotary")
  }
  const user =await User.findOne({email});
  
  //compare password with hashpassword
  if(user &&  (await bcrypt.compare(password,user.password))){
    const accessToken=jwt.sign({
      user:{
        username:user.username,
        email:user.email,
        id:user.id
      }
    },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"});
    res.status(200).json({accessToken})
  }else{
    res.status(401);
    throw new Error("email or password is not valid")
  }
  
});

export const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user)
});
