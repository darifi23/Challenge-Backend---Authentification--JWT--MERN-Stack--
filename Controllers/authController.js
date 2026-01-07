// --- SECTION 1: IMPORTS ---
const User = require("../Models/user"); // Import the User blueprint
const bcrypt = require("bcryptjs"); // Tool to encrypt/hash passwords
const jwt = require("jsonwebtoken"); // Tool to create secure tokens

// --- SECTION 2: REGISTER LOGIC ---
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password (Security Rule: never store plain text)
    // 10 is the "salt rounds" (strength of encryption)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- SECTION 3: LOGIN LOGIC ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Compare the password sent in Postman with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 3. Create a JWT Token (The "digital pass")
    // We hide the user ID inside the token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // 4. Send the token back (Rule: Do not return the password)
    res.status(200).json({
      message: "Login successful",
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
