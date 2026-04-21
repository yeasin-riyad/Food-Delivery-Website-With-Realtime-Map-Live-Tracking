import express from "express";
import { signUp,signIn,signOut } from "../controllers/auth.controllers.js";

const authRoute = express.Router();

// Sign Up route
authRoute.post("/signup", signUp);

// Sign In route
authRoute.post("/signin", signIn);

// Sign Out route
authRoute.get("/signout", signOut);

export default authRoute;