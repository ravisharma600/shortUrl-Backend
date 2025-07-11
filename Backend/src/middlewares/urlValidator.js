import shortUrl from "../models/shorturl.model.js";
import dotenv from "dotenv"
dotenv.config({path:"./.env"})
export default async function validateUr0 (req, res, next) {
  const { url } = req.body;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      throw new Error();
    }
    const existing = await shortUrl.findOne({ full_url: url });
    if (existing) {
      return res.status(409).json({
        error: 'Short URL already exists',
        shortUrl: `${process.env.BASE_URL}/${existing.short_url}`
      });
    }
    next();
  } catch {
    return res.status(400).json({ error: 'Invalid URL' });
  }
}