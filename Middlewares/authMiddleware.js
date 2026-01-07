// --- SECTION 1: IMPORT JWT ---
const jwt = require("jsonwebtoken"); // We need this to verify the token

// --- SECTION 2: THE MIDDLEWARE FUNCTION ---
module.exports = (req, res, next) => {
  // 1. Get the token from the request header
  // In Postman, we usually send it in the 'Authorization' field
  const token = req.header("Authorization");

  // 2. Check if the token exists
  if (!token) {
    // If no token, we stop here and send a 401 (Unauthorized) error
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    // 3. Verify the token using our secret key from .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Add the verified user data to the 'req' object
    // This allows the next function to know WHO the user is
    req.user = verified;

    // 5. Move to the next step (the Controller)
    next();
  } catch (error) {
    // If the token is fake or expired, we send an error
    res.status(400).json({ message: "Invalid Token" });
  }
};
