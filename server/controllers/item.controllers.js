import Item from "../models/item.model.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";


export const createItem = async (req, res) => {
  try {
    const { name, shop, category, price, foodType } = req.body;

    // 🔴 Basic validation
    if (!name || !shop || !category || !price || !foodType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const validCategories = Item.schema.path("category").enumValues;

    //Category Validation
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        message: "Invalid category",
      });
    }

    //Price Validation
    if (price < 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    // 🔴 Image check
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // ☁️ Upload to Cloudinary
    let uploadedImage;
    try {
      uploadedImage = await uploadOnCloudinary(req.file.path, "food-items");
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
      });
    }

    const imageUrl = uploadedImage?.secure_url || uploadedImage?.url;

    // 🔴 Create item
    const newItem = await Item.create({
      name,
      image: imageUrl,
      shop,
      category,
      price,
      foodType,
    });

    return res.status(201).json({
      success: true,
      message: "Item created successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Create Item Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};


export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let imageData = item.image;

    // 👉 New image uploaded
    if (req.file) {
      // 🗑️ delete old image
      if (item.image?.public_id) {
        await deleteFromCloudinary(item.image.public_id);
      }

      // ☁️ upload new image
      const uploaded = await uploadOnCloudinary(req.file.path, "food-items");

      imageData = {
        url: uploaded.url,
        public_id: uploaded.public_id,
      };
    }

    // 👉 Update باقي fields
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: imageData,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      item: updatedItem,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Update failed",
    });
  }
};

