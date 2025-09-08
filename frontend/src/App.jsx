import { useEffect, useState } from "react";
import API from "./utils/api";
import Slider from "react-slick";

export default function App() {
  const [menItems, setMenItems] = useState([]);
  const [womenItems, setWomenItems] = useState([]);
  const [kidsItems, setKidsItems] = useState([]);
  const [deals, setDeals] = useState([]);

  const fetchItems = async () => {
    try {
      const resMen = await API.get("/items?category=Men");
      const resWomen = await API.get("/items?category=Women");
      const resKids = await API.get("/items?category=Kids");
      const resDeals = await API.get("/items?minPrice=500&maxPrice=1500");

      setMenItems(resMen.data);
      setWomenItems(resWomen.data);
      setKidsItems(resKids.data);
      setDeals(resDeals.data.slice(0, 6));
    } catch (err) {
      console.error("Error fetching items", err);
    }
  };

  // ✅ Add to Cart function
  const handleAddToCart = async (item) => {
    try {
      await API.post("/cart", {
        productId: item._id,
        quantity: 1,
        size: item.size || "M", // fallback if no size
      });
      alert(`${item.name} added to cart ✅`);
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("❌ Failed to add to cart");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="w-full">
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center text-white text-center px-4">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Welcome to Fashion Store 👗
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6">
            Discover the latest trends in Men, Women, and Kids Fashion
          </p>
          <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* DEALS OF THE DAY */}
      <DealsCarousel items={deals} onAddToCart={handleAddToCart} />

      {/* MEN SECTION */}
      <Section title="Men's Collection" items={menItems} onAddToCart={handleAddToCart} />

      {/* WOMEN SECTION */}
      <Section title="Women's Collection" items={womenItems} onAddToCart={handleAddToCart} />

      {/* KIDS SECTION */}
      <Section title="Kids' Collection" items={kidsItems} onAddToCart={handleAddToCart} />
    </div>
  );
}

// ✅ Deals Carousel Component
function DealsCarousel({ items, onAddToCart }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">🔥 Deals of the Day</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item._id} className="px-2">
            <div className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center hover:shadow-lg hover:scale-105 transform transition">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-44 w-full object-contain rounded bg-gray-100 p-2"
              />
              <h3 className="font-semibold mt-3 text-center truncate">
                {item.name}
              </h3>
              <p className="text-purple-700 font-bold mt-1">₹{item.price}</p>
              <button
                onClick={() => onAddToCart(item)}
                className="mt-3 w-full bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// ✅ Reusable Category Section
function Section({ title, items, onAddToCart }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="min-w-[220px] max-w-[220px] h-[350px] flex flex-col justify-between 
                         bg-white shadow-md rounded-xl p-4 hover:shadow-lg hover:scale-105 transform transition"
            >
              {/* Image */}
              <div className="h-40 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between mt-3">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs">{item.category}</p>
                <p className="text-purple-700 font-bold">₹{item.price}</p>
              </div>

              {/* Button */}
              <button
                onClick={() => onAddToCart(item)}
                className="mt-3 w-full bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
