import express from "express"
const userRoute=express.Router();

import { register,login,currentUser} from "../controllers/user.controller.js";
import { validToken } from "../middleware/validateToken.js";



userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.get("/current",validToken,currentUser)





export default userRoute