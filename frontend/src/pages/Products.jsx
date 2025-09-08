import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    size: "",
    minPrice: "",
    maxPrice: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/items", { params: filters });
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchProducts();
  };

  const addToCart = async (productId, size, quantity) => {
    try {
      await API.post("/cart", { productId, quantity, size });
      alert("✅ Item added to cart!");
    } catch (err) {
      console.error(err);
      alert("❌ You must login first");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        🛍️ Fashion Products
      </h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 bg-gray-50 p-4 rounded-lg shadow-sm">
        {/* Category */}
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        {/* Size */}
        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="">All Sizes</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        {/* Price Range */}
        <select
          name="priceRange"
          value={
            filters.minPrice && filters.maxPrice
              ? `${filters.minPrice}-${filters.maxPrice}`
              : "-"
          }
          onChange={(e) => {
            const [min, max] = e.target.value.split("-");
            setFilters({ ...filters, minPrice: min || "", maxPrice: max || "" });
          }}
          className="border p-2 rounded w-full md:w-auto"
        >
          <option value="-">All Prices</option>
          <option value="200-500">₹200 - ₹500</option>
          <option value="500-700">₹500 - ₹700</option>
          <option value="700-1000">₹700 - ₹1000</option>
          <option value="1000-2000">₹1000 - ₹2000</option>
          <option value="2000-5000">₹2000 - ₹5000</option>
          <option value="5000-10000">₹5000 - ₹10000</option>
        </select>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition w-full md:w-auto"
        >
          Apply
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

// ⬇️ ProductCard component
function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border rounded-xl shadow-sm hover:shadow-lg transition flex flex-col bg-white">
      <img
        src={product.imageUrl || "https://via.placeholder.com/150"}
        alt={product.name}
        className="h-56 w-full object-contain rounded-t-xl bg-gray-100 p-2"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-gray-500 text-sm mb-1">
          {product.category} • Size {product.size}
        </p>
        <p className="text-purple-600 font-bold text-lg mb-4">
          ₹{product.price}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => addToCart(product._id, product.size, quantity)}
          className="mt-auto bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
