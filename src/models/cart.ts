import * as mongoose from "mongoose";
import { model } from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  products: { type: Array, required: true },
  instruction: { type: String },
  status: { type: String, required: true },
  //   total: { type: Number, required: true },
  //   grandTotal: { type: Number, required: true },
  deliveryCharge: { type: Number, required: true },
  total: { type: Number, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("Cart", cartSchema);
