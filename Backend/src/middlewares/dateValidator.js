export default function parseExpiry(req, res, next) {
  const { expireAt } = req.body;

  const isValidFutureDate = (input) => {
    const date = new Date(input);
    return input && !isNaN(date.getTime()) && date > new Date();
  };

  if (expireAt) {
    if (!isValidFutureDate(expireAt)) {
      return res.status(400).json({
        error: 'Expire date must be a valid future date-time in ISO format (e.g. 2025-07-11T16:30:00.000Z)'
      });
    }

    req.body.finalExpiry = new Date(expireAt);
  } else {
    req.body.finalExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
  }

  next();
}