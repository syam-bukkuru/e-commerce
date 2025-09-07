// clearItems.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/Item"); // no .js extension in CommonJS

dotenv.config();

async function clearItems() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany({});
    console.log("✅ All items deleted");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

clearItems();
