module.exports = async function handler(req, res) {
  // Allow cross-origin fetches from stores
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "public, max-age=60");
  res.status(200).json({ text: "🎉 Free Shipping on All Orders! 🎉" });
};
