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

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="w-full">
      {/* HERO BANNER */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-500 h-[400px] flex items-center justify-center text-white text-center">
        <div>
          <h1 className="text-5xl font-extrabold mb-4">
            Welcome to Fashion Store 👗
          </h1>
          <p className="text-lg mb-6">
            Discover the latest trends in Men, Women, and Kids Fashion
          </p>
          <button className="bg-white text-purple-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
            Shop Now
          </button>
        </div>
      </div>

      {/* DEALS OF THE DAY */}
      <DealsCarousel items={deals} />

      {/* MEN SECTION */}
      <Section title="Men's Collection" items={menItems} />

      {/* WOMEN SECTION */}
      <Section title="Women's Collection" items={womenItems} />

      {/* KIDS SECTION */}
      <Section title="Kids' Collection" items={kidsItems} />
    </div>
  );
}

// Deals Carousel Component (unchanged)
function DealsCarousel({ items }) {
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
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">🔥 Deals of the Day</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item._id} className="px-2">
            <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:scale-105 transform transition">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-48 w-full object-contain rounded bg-gray-100"
              />
              <h3 className="font-semibold mt-2">{item.name}</h3>
              <p className="text-purple-700 font-bold">₹{item.price}</p>
              <button className="mt-2 w-full bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

// Reusable Category Section (fixed uniform cards)
function Section({ title, items }) {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {items.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
          {items.map((item) => (
            <div
              key={item._id}
              className="min-w-[220px] max-w-[220px] h-[350px] flex flex-col justify-between 
                         bg-white shadow-lg rounded-lg p-4 hover:scale-105 transform transition"
            >
              {/* Image container */}
              <div className="h-40 flex items-center justify-center">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product details */}
              <div className="flex-1 flex flex-col justify-between mt-2">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-xs">{item.category}</p>
                <p className="text-purple-700 font-bold">₹{item.price}</p>
              </div>

              {/* Button */}
              <button className="mt-2 w-full bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
