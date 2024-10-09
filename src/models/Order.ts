import * as mongoose from "mongoose";
import { model } from "mongoose";

const trackingSchema = new mongoose.Schema({
  company: { type: Number },
  tracking_no: { type: Number },
  status: { type: String },
  estimated_delivery: { type: String },
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  products: { type: Array, required: true },
  instruction: { type: String, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  grandTotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  payment_status: { type: Boolean, required: true },
  payment_mode: { type: String, required: true },
  track: trackingSchema,
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("orders", orderSchema);
