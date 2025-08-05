const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const checkForAuth = require("./middlewares/auth");
const userModel = require("./models/user");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Root route reached.");
});

app.post("/createUser", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { email: user.email, role: user.role, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false });

    // Don't send password in response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/check-auth", checkForAuth, async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Authenticated",
      user: user,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/logoutUser", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/admin", checkForAuth, (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Access denied: Not a seller" });
  }
  res.send("Admin route accessed by seller");
});

app.get("/user", checkForAuth, (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Access denied: Not a user" });
  }
  res.send("User route accessed by user");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
