import rateLimit from 'express-rate-limit';
const redirectLimiter = rateLimit({
  windowMs: 60 * 1000, 
  max: 60, 
  message: 'Too many requests, please slow down.',
});
export default redirectLimiter;