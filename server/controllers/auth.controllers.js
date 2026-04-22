import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import { sendOtpEmail } from "../utils/mail.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }
    if (mobile.length !== 11) {
      return res
        .status(400)
        .json({ message: "Mobile number must be exactly 11 characters long" });
    }
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });
    await newUser.save();
    const token = await genToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser, token });
  } catch (error) {
    return res.status(500).json({ message: "SignUp Error", error: error.message });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.json({ message: "Signin successful", user, token });
  } catch (error) {
    return res.status(500).json({ message: "SignIn Error", error: error.message });
  }
};

export const signOut = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.json({ message: "Signout successful" });
  } catch (error) {
    return res.status(500).json({ message: "SignOut Error", error: error.message });
  } 
};


export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit OTP
    user.resetOtp = otp;
    user.otpVerified = false;
    user.otpExpires = Date.now() + 5 * 60 * 1000;

    await user.save();
    const emailSent = await sendOtpEmail(user.email, otp);
    if (!emailSent) {
      return res.status(500).json({ message: "Error sending OTP email" });
    }
    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "OTP has expired" });
    }
    user.otpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();
    return res.json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.otpVerified = false;
    await user.save();
    return res.json({ message: "Password reset successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};
