const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../middlewares/isAuthenticated");

//---Registration---
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // validate
  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "All fields are required", status: false });
  }
  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  // add the date the trail expires
  newUser.trialExpires = new Date(
    new Date().getTime() + newUser.trialPeriod * 24 * 60 * 60 * 1000
  );
  await newUser.save();
  res.json({
    message: "User registered successfully",
    status: true,
    user: {
      username,
      email,
    },
  });
});
//---Login---
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check user email
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  // check password
  const isPasswordValid = await bcrypt.compare(password, user?.password);
  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  // generate token (jwt)
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
  // set the token in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
  // send the response
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    secure: process.env.NODE_ENV === "production", // true in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Strict for local, None for cross-site (Render -> Vercel)
  });
  
  res.json({
    message: "User logged in successfully",
    status: "success",
    _id: user?._id,
    username: user?.username,
    email: user?.email,
  });
});
//---Logout---
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    maxAge: 1,
  });
  res.status(200).json({ message: "Logged out successfully" });
});
//---Profile---
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password")
    .populate("payments")
    .populate("contentHistory");
  if (user) {
    res.status(200).json({
      message: "User profile fetched successfully",
      status: "success",
      user,
    });
  } else {
    res.status(404).json({ message: "User not found", status: "error" });
  }
});
//---Check User Auth Status---
const checkAuth = asyncHandler(async (req, res) => {
  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
  if (decoded) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

module.exports = {
  register,
  login,
  logout,
  userProfile,
  checkAuth,
};
