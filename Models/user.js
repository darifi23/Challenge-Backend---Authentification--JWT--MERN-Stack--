// --- SECTION 1: IMPORT MONGOOSE ---
const mongoose = require("mongoose");

// --- SECTION 2: DEFINE THE SCHEMA ---
// The Schema is the structure of your document.
// It defines what fields a user must have.
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // The email is mandatory
      unique: true, // Prevents two people from using the same email
      lowercase: true, // Saves email as lowercase to avoid login issues
      trim: true, // Removes accidental spaces
    },
    password: {
      type: String,
      required: true, // The password is mandatory
      // Note: We will hash this in the controller before saving
    },
  },
  {
    // This automatically adds "createdAt" and "updatedAt" fields
    timestamps: true,
  }
);

// --- SECTION 3: EXPORT THE MODEL ---
// We create a model named 'User' using our schema.
// This allows us to perform actions like User.create() or User.find().
module.exports = mongoose.model("User", userSchema);
