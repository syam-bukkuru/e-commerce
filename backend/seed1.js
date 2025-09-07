// seed.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Item = require("./models/Item");

dotenv.config();

const items = [
  {
    name: "Women Cotton Blend Kurta Pant Dupatta Set",
    price: 497,
    category: "Women",
    size: "L",
    description: "Light cotton summer dress",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757275677/xxl-stree-terriberri-original-imah7uz6zht6uzub_rfqxbh.webp"
  },
  {
    name: "Summer Maxi Dress",
    price: 1500,
    category: "Women",
    size: "L",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757275469/Sky-blue-satin-indo-western-lehenga-choli-PRQ3969-300x450_koodgi.jpg"
  },
  {
    name: "Women Viscose Rayon Kurta Pant",
    price: 492,
    category: "Women",
    size: "S",
    description: "Unique Pattern With its unique self-design pattern, this women's kurta, dupatta, and pant set showcases your individuality and fashion sense. Moreover, the intricate self-design adds an exclusive touch to your outfit, ensuring you stand out in style at any event, whether casual or formal.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757276196/m-ak-21-freydis-original-imah38cxexewzxse_aejzoi.webp"
  },
  {
    name: "Women Cotton Blend Kurta Pant Dupatta",
    price: 697,
    category: "Women",
    size: "L",
    description: "Made from a cotton blend fabric, this ensemble provides a combination of softness, breathability, and durability. The cotton blend fabric ensures you stay cool and comfortable throughout the day, which makes it ideal for long hours of wear. Whether you are at a festive celebration or a casual gathering, this outfit provides ultimate comfort without compromising on style.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757276323/s-sky-348bluefloralkpdset-skyasia-original-imah2auggzzccr3x_zga3z5.webp"
  },
  {
    name: "Women Pure Cotton Kurta Dupatta",
    price: 859,
    category: "Women",
    size: "XL",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757276487/s-ach-white-gown-dream-royal-original-imahcgpv2fwvnkhz_aqs34a.webp"
  },
  {
    name: "Women Viscose Rayon Kurta Palazzo Dupatta",
    price: 830,
    category: "Women",
    size: "S",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757276570/s-32-shreedha-original-imah3hbmmnrsgpkt_cvjr1u.webp"
  },
  {
    name: "Women Silk Blend Kurta Pant Dupatta",
    price: 1199,
    category: "Women",
    size: "L",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757276664/m-kh9yl6198-indo-era-original-imahyy36evupw3nr_xr7okl.webp"
  },
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
  {
    name: "Birthday Special",
    price: 599,
    category: "Kids",
    size: "L",
    description: "Light cotton Birthday dress",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757277862/girls._CB469401626__lib2nc.jpg"
  },
  {
    name: "Bold N Elegant - Be Bold Inside & Elegant Outside Baby's Cotton Tshirt Pant",
    price: 659,
    category: "Kids",
    size: "L",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278459/51nUfiMuCLL._AC_UL480_FMwebp_QL65__g0ups1.webp"
  },
  {
    name: "PAMBERSTON Girls Geometric Print Dress for Kids, Fit and Flare, Round Neck, Frock for Girls (Black)",
    price: 389,
    category: "Kids",
    size: "S",
    description: "Unique Pattern With its unique self-design pattern, this women's kurta, dupatta, and pant set showcases your individuality and fashion sense. Moreover, the intricate self-design adds an exclusive touch to your outfit, ensuring you stand out in style at any event, whether casual or formal.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278540/71LmbuZj0vL._AC_UL480_FMwebp_QL65__jld1bs.webp"
  },
  {
    name: "Naixa Girls Rayon Fabric Floral Printed 3/4 Sleeve Sharara Dress Set For All Occasion salwar suit",
    price: 999,
    category: "Kids",
    size: "L",
    description: "Made from a cotton blend fabric, this ensemble provides a combination of softness, breathability, and durability. The cotton blend fabric ensures you stay cool and comfortable throughout the day, which makes it ideal for long hours of wear. Whether you are at a festive celebration or a casual gathering, this outfit provides ultimate comfort without compromising on style.",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278612/71asiJDLI1L._AC_UL480_FMwebp_QL65__a0dpa9.webp"
  },
  {
    name: "WTAGAS Girl's Polyester A-Line Knee-Length Dress",
    price: 579,
    category: "Kids",
    size: "XL",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278718/81mDk6kWDPL._AC_UL480_FMwebp_QL65__ykrcdh.webp"
  },
  {
    name: "Googo Gaaga Boys Cotton Printed Hoodie Sweatshirt with Joggers in Clothing Set",
    price: 664,
    category: "Kids",
    size: "S",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278770/51OFP4X1R4L._AC_UL480_FMwebp_QL65__iysdht.webp"
  },
  {
    name: "Googogaaga Boy's Cotton Full Sleeves Sweatshirt with Pant Set in Yellow Color",
    price: 569,
    category: "Kids",
    size: "L",
    description: "Flowy maxi dress for summer evenings",
    imageUrl: "https://res.cloudinary.com/dubhraac2/image/upload/v1757278833/51G0KvN6TsL._AC_UL480_FMwebp_QL65__gsg1ih.webp"
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
