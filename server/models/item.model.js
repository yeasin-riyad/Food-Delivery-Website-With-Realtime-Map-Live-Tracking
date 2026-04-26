import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        required: true,
      },
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwiches",
        "South Indian",
        "North Indian",
        "Chinese",
        "Thai",
        "Fast Food",
        "Traditional",
        "Biryani & Polao",
        "Bhuna & Curry",
        "Street Food",
        "BBQ & Grill",
        "Drinks",
        "Breakfast",
        "Others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["veg", "non veg"],
      required: true,
    },
  },
  { timestamps: true },
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
