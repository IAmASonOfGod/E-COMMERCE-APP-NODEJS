import * as mongoose from "mongoose";
import { model } from "mongoose";

const metricsSchema = new mongoose.Schema({
  orders: { type: Number },
  ratings: { type: Number },
});

const sizeSchema = new mongoose.Schema({
  size: { type: String },
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
});

const variationSchema = new mongoose.Schema({
  type: { type: String },
  images: [{ type: String }],
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
  size: [sizeSchema],
});

const inventorySchema = new mongoose.Schema({
  store_id: {
    type: mongoose.Types.ObjectId,
    ref: "stores",
    required: true,
  },
  category_id: {
    type: mongoose.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  sub_category_id: {
    type: mongoose.Types.ObjectId,
    ref: "sub_categories",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String },
  specifications: { type: Object },
  images: [{ type: String }],
  sku: { type: String },
  price: { type: Number },
  stock_unit: { type: Number },
  metrics: metricsSchema,
  variations: variationSchema,
  status: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("inventory", inventorySchema);
