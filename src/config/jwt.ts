export default {
  secret: process.env.JWT_SECRET,
  expiry: parseInt(process.env.JWT_EXPIRY, 10),
};
