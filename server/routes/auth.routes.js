import express from "express";
import { signUp,signIn,signOut, sendOtp, verifyOtp, resetPassword, googleAuthStartHandler, googleAuthCallbackHandler } from "../controllers/auth.controllers.js";

const authRoute = express.Router();

// Sign Up route
authRoute.post("/signup", signUp);

// Sign In route
authRoute.post("/signin", signIn);

// Sign Out route
authRoute.get("/signout", signOut);

// Send OTP route
authRoute.post("/send-otp", sendOtp);

// Verify OTP route
authRoute.post("/verify-otp", verifyOtp);

// Reset Password route
authRoute.post("/reset-password", resetPassword);

// Google Sign In route
authRoute.get("/google", googleAuthStartHandler);

//Google Sign In callback route
authRoute.get("/google/callback", googleAuthCallbackHandler);


export default authRoute;