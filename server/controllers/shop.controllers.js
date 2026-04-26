import Shop from "../models/shop.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const createShop = async (req, res) => {
  try {
    const { name, city, division, address } = req.body;

    if (!name || !city || !division || !address || !req.file) {
      return res.status(400).json({
        message: "All fields including image are required",
      });
    }

    // 🔍 check already has shop
    const existingShop = await Shop.findOne({ owner: req.userId });
    if (existingShop) {
      return res.status(400).json({
        message: "You already have a shop",
      });
    }

    // ☁️ upload image
    const image = await uploadOnCloudinary(req.file.path, "shops");

    const shop = await Shop.create({
      name,
      city,
      division,
      address,
      image,
      owner: req.userId,
    });

    await shop.populate("owner");

    return res.status(201).json({
      message: "Shop created successfully",
      shop,
    });
  } catch (error) {
    console.error("Create Shop Error:", error);
    return res.status(500).json({
      message: "Error creating shop",
      error: error.message,
    });
  }
};



export const updateShop = async (req, res) => {
  try {
    const { name, city, division, address } = req.body;

    if (!name || !city || !division || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(404).json({
        message: "Shop not found",
      });
    }

    let image = shop.image;

    // 🆕 new image upload
    if (req.file) {
      const uploadedImage = await uploadOnCloudinary(req.file.path, "shops");

      // 🔥 delete old image
      if (shop?.image?.public_id) {
        await deleteFromCloudinary(shop.image.public_id);
      }

      image = uploadedImage;
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      shop._id,
      {
        name,
        city,
        division,
        address,
        image,
      },
      { new: true }
    ).populate("owner");

    return res.status(200).json({
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    console.error("Update Shop Error:", error);
    return res.status(500).json({
      message: "Error updating shop",
      error: error.message,
    });
  }
};



export const getMyShop = async (req, res) => {
  try {
    // 🔍 logged in user এর shop খুঁজবো
    const shop = await Shop.findOne({ owner: req.userId })
      .populate("owner items", "-password") // password hide
      .lean();

    if (!shop) {
      return res.status(404).json({
        message: "No shop found for this user",
      });
    }

    return res.status(200).json({
      message: "Shop fetched successfully",
      shop,
    });

  } catch (error) {
    console.error("Get My Shop Error:", error);
    return res.status(500).json({
      message: "Error fetching shop",
      error: error.message,
    });
  }
};