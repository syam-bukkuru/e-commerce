// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/Item");

dotenv.config();

const items = [
  {
    name: "Men Slim Fit Solid Spread Collar Formal Shirt",
    price: 278,
    category: "Men",
    size: "L",
    description: "Light cotton summer dress",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277022/xl-kcsh-fo-1647-pu-fubar-original-imah4zezwbddyy58_aijvvp.webp"
  },
  {
    name: "Amzira Men's Stylish Ethnic Wear Black Kurta Pajama Set with Long Jacket",
    price: 1999,
    category: "Men",
    size: "XL",
    description: "Material : Kurta Pajama Fabric Cotton, Jacket Fabric :- Heavy Jecquard. Style: Kurta Pajama with Designer Jacket Set. Collar: Mandarin, Sleeves: Full, Fit type: Regular/ Comfort, Length: Mid thigh. Occasion : marriages, weddings, temple visit, all festival, diwali, navratri, dussehra, pooja, christmas, onam, pongal, ganesha, yugadi, christmas, birthday, all spacial occasion",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277171/51Zd0_htwTL._AC_UL480_FMwebp_QL65__fbaezg.webp"
  },
  {
    name: "MADHAVISTA Men's Regular Fit Cotton Blend Casual Kurta| Mens Short Kurta",
    price: 551,
    category: "Men",
    size: "S",
    description: "Breathable fabric : natural 100% cotton that is what makes our shirt so good. Soft and light on your skin, it also breathes very well",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277303/61fhv3fmmjL._AC_UL480_FMwebp_QL65__jdf3bp.webp"
  },
  {
    name: "VASTRAMAY Men's Cotton Regular Fit Tunic Tunic",
    price: 684,
    category: "Men",
    size: "L",
    description: "Made from a cotton blend fabric, this ensemble provides a combination of softness, breathability, and durability. The cotton blend fabric ensures you stay cool and comfortable throughout the day, which makes it ideal for long hours of wear. Whether you are at a festive celebration or a casual gathering, this outfit provides ultimate comfort without compromising on style.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277418/717hS3wQp1L._AC_UL480_FMwebp_QL65__qavjo2.webp"
  },
  {
    name: "DIVISIVE Men's Sequince Embroidered Cotton Blend Only Slim Fit Kurta",
    price: 839,
    category: "Men",
    size: "XL",
    description: "Stylish Design: Elevate your casual look with a unique one-side Solid/printed pattern for a trendy vibe.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277499/71JSv5C7FnL._AC_UL480_FMwebp_QL65__phxwd2.webp"
  },
  {
    name: "Pashmoda Wool Men Jamawar Shawl, Authentic Kashmiri Luxury Pashmina Style Shawl, Stole",
    price: 1011,
    category: "Men",
    size: "S",
    description: "SIZE: 40X80 Inches, 100x200 CM (Medium Size), COMPOSITION: Wool Blend",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277713/61pY6tG8zvL._AC_UL480_FMwebp_QL65__wq5jvt.webp"
  },
  {
    name: "MADHAVISTA Men's Regular Fit Solid Popcorn Full Sleeve Regular Fit Short Kurta | Solid Pattern Mandarin Collar Straight Kurta",
    price: 470,
    category: "Men",
    size: "XL",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277739/71S5dcx6KNL._AC_UL480_FMwebp_QL65__sku3hz.webp"
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Item.deleteMany({});
    await Item.insertMany(items);
    console.log("✅ Database seeded with products");
    mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error seeding DB:", err);
  }
}

seedDB();
