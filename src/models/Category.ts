import * as mongoose from "mongoose";
import { model } from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: false },
  status: { type: Boolean, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

export default model("categories", categorySchema);
