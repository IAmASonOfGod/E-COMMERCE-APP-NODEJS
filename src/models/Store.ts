import * as mongoose from "mongoose";
import { model } from "mongoose";

const storeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  city_id: { type: mongoose.Types.ObjectId, ref: "cities", required: true },
  name: { type: String, required: true },
  description: { type: String },
  cover: { type: String, required: false },
  location: { type: Object, required: true },
  openTime: { type: String, required: false },
  closeTime: { type: String, required: false },
  // isClose: { type: Boolean, required: true },
  status: { type: String, required: true },
  // rating: { type: Number, required: true, default: 0 },
  // totalRating: { type: Number, required: true, default: 0 },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("stores", storeSchema);
