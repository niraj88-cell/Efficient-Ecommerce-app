const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;  // Use 'authorization' as per convention
  if (authHeader) {
    // Extract the token from the header: Bearer <token>
    const token = authHeader.split(" ")[1];  // This will get the actual token

    jwt.verify(token, "niraj", (err, user) => {  // Replace "your-secret-key" with your actual secret
      if (err) 
        {
          console.error("Token verification error:", err);
          return res.status(403).json("Token is not valid!");
        }
      req.user = user;
      next();  // Proceed to the next middleware or route handler
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = { verifyToken };
