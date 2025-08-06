const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const checkForAuth = require("./middlewares/auth");
const userModel = require("./models/user");
const ProductModel = require("./models/products");
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

// USER ROUTES
app.get("/getProducts", async (req, res) => {
  try {
    const products = await ProductModel.find();
    // console.log("Fetched products:", products);
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/product/:id", async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, price, quantity, imageUrl, description, category } = product;
    const productDetails = {
      name,
      price,
      quantity,
      imageUrl,
      description,
      category,
      seller: product.seller,
      _id: product._id,
    };
    console.log("Product details fetched:", productDetails);
    res.status(200).json({ product: productDetails });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/saveCart", checkForAuth, async (req, res) => {
  try {
    const { cart } = req.body;

    // Save cart to user's document in the database
    const user = await userModel.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = cart;
    await user.save();

    res.status(200).json({ message: "Cart saved successfully" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ADMIN ROUTES
app.get("/getProductDetails/:id", checkForAuth, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const { name, price, quantity, imageUrl, description, category } = product;
    const productDetails = {
      name,
      price,
      quantity,
      imageUrl,
      description,
      category,
      seller: product.seller,
      _id: product._id,
    };
    res.status(200).json({
      product: productDetails,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/getProductsInMyInventory", checkForAuth, async (req, res) => {
  try {
    // console.log("Fetching products for user:", req.user.userId);
    const products = await ProductModel.find({ seller: req.user.userId });
    res.status(200).json({ products });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.put("/updateProductDetails/:id", checkForAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, quantity, description, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "Missing required fields: name, price, description, category",
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        price: Number(price),
        quantity: Number(quantity) || 0,
        description,
        category,
        imageUrl,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addNewProduct", checkForAuth, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Access denied: Not a seller" });
    }
    const { name, price, quantity, description, category, imageUrl } = req.body;

    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "Missing required fields: name, price, description, category",
      });
    }
    // Create product with proper field mapping
    const productData = {
      name,
      price: Number(price),
      quantity: Number(quantity) || 0,
      description,
      category,
      imageUrl,
      seller: req.user.userId,
    };
    // console.log("Creating product with data:", productData);

    const newProduct = await ProductModel.create(productData);
    // console.log("New product added:", newProduct);
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    console.error("Error adding product:", err);

    // Send detailed error for development
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: "Validation error",
        errors: errors,
      });
    }

    res.status(500).json({
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
