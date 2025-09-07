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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛍️ Fashion Products</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select
          name="size"
          value={filters.size}
          onChange={handleFilterChange}
          className="border p-2 rounded"
        >
          <option value="">All Sizes</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={handleFilterChange}
          className="border p-2 rounded w-32"
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={handleFilterChange}
          className="border p-2 rounded w-32"
        />

        <button
          onClick={applyFilters}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Apply
        </button>
      </div>

      {/* Products Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
}

// ⬇️ ProductCard component handles local quantity state
function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <img
        src={product.imageUrl || "https://via.placeholder.com/150"}
        alt={product.name}
        className="h-48 w-full object-cover mb-3 rounded"
      />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p className="text-gray-600">
        {product.category} • Size {product.size}
      </p>
      <p className="text-purple-600 font-bold">₹{product.price}</p>

      {/* Quantity Selector */}
      <div className="flex items-center mt-3 space-x-2">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="px-3 py-1 bg-gray-300 rounded"
        >
          +
        </button>
      </div>

      <button
        onClick={() => addToCart(product._id, product.size, quantity)}
        className="mt-auto bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
