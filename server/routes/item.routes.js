import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createItem,updateItem } from "../controllers/item.controllers.js";
import { upload } from "../middlewares/multer.js";
const itemRouter=express.Router();

// Define shop-related routes here
itemRouter.post("/create",isAuth,upload.single("image"),createItem);
itemRouter.post("/update/:id",isAuth,upload.single("image"),updateItem);

export default itemRouter;