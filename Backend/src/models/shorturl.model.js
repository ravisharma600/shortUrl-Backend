import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
    unique: true
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  clicks: {
    type: Number,
    default: 0
  },
  expireAt: {
    type: Date,
    required:true
  }
}, {
  timestamps: true
});

shortUrlSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);
export default shortUrl;