import * as mongoose from "mongoose";
import { model } from "mongoose";

const bannerSchema = new mongoose.Schema({
  // restaurant_id: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "restaurants",
  // },
  banner: { type: String, required: true },
  status: { type: Boolean, required: true, default: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("banners", bannerSchema);
