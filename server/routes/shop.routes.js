import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createShop, getMyShop, updateShop } from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";
const shopRouter=express.Router();

// Define shop-related routes here
shopRouter.post("/create",isAuth,upload.single("image"),createShop);
shopRouter.post("/update",isAuth,upload.single("image"),updateShop);
shopRouter.get("/my-shop", isAuth, getMyShop);


export default shopRouter;