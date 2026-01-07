// --- SECTION 1: IMPORTS (THE TOOLS) ---
// We use 'require' for all imports as specified in the project rules[cite: 16].
const express = require("express"); // The framework to build our web server[cite: 14].
const mongoose = require("mongoose"); // The tool to talk to our MongoDB database[cite: 14].
require("dotenv").config(); // This loads our secret variables (like DB links) from the .env file.

// --- SECTION 2: INITIALIZATION (THE SETUP) ---
const app = express(); // Create the actual server application object.

// --- SECTION 3: MIDDLEWARE (THE TRANSLATOR) ---
// This allows our server to read JSON data sent from Postman.
// Without this, 'req.body' will be undefined.
app.use(express.json());

// --- SECTION 4: ROUTE REGISTRATION (THE ROADMAP) ---
// We import the specific route file for User/Auth tasks[cite: 20].
const userRoute = require("./Routes/userRoute");

// We tell the app that any URL starting with "/api" should use our userRoute.
// For example: http://localhost:5000/api/register
app.use("/api", userRoute);

// --- SECTION 5: DATABASE & SERVER START (THE ENGINE) ---
// Use the variables we defined in our .env file.
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

// Connect to MongoDB using the link from our .env.
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected successfully");

    // We only start the server IF the database connection is working.
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    // If the database connection fails, we log the error here.
    console.error("❌ MongoDB connection error:", err);
  });
