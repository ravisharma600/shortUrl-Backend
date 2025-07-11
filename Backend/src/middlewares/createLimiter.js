import rateLimit from 'express-rate-limit';

const createShortUrlLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    error: 'Too many short URLs created. Please try again later.'
  } 
});
export default createShortUrlLimiter;