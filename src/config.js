module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL
    || 'postgres://mfjmcocmxonvdp:511e23913dc016da304c83b22cef2a2681ece668d9fee220efde856465eea7d1@ec2-34-237-166-54.compute-1.amazonaws.com:5432/da0a7dmj44ufln',
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret',
  JWT_EXPIRY: process.env.JWT_EXPIRY || '3h',
}
