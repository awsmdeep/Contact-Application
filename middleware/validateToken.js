import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const validToken = asyncHandler(async (req, res, next) => {
  let token;
  
  // Extract Authorization header
  const authHeader = req.headers.authorization || req.headers.Authorization;

  // Check if Authorization header starts with 'Bearer'
  if (authHeader && authHeader.startsWith("Bearer")) {
    // Extract token from the Authorization header
    token = authHeader.split(" ")[1];
    
    // Verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      
      // If the token is valid, assign the decoded user to the request object
      req.user = decoded.user;
      
      // Proceed to the next middleware
      next();
    });
  } else {
    res.status(401);
    throw new Error("No token provided, authorization denied");
  }
});
