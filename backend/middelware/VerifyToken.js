import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {



const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1];

console.log("data: ", process.env.ACCESS_TOKEN_SECRET)
  
  if (token.length === 0) {
    return res.status(401).json({ message: 'JWT must be provided' });
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    
    if (err) {
        return res.status(401).json({ message: err.message });
    } 
    console.log("user: ", decoded)
    req.user = decoded; // Attach user information to the request object
    next();
  });
}
