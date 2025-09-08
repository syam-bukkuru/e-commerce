import { useEffect, useState } from "react";
import API from "../utils/api";

export default function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromCart = async (productId, size) => {
    try {
      await API.delete(`/cart/${productId}/${size}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const updateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await API.put(`/cart/${productId}/${size}`, { quantity: newQuantity });
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (!cart) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-6 text-gray-800">🛒 Your Cart</h1>

      {cart.items.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-center md:items-start justify-between 
                           border p-4 rounded-xl shadow bg-white hover:shadow-lg transition"
              >
                {/* Product Image + Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 w-full md:w-auto">
                  <img
                    src={item.product?.imageUrl || "https://via.placeholder.com/150"}
                    alt={item.product?.name || "Product"}
                    className="w-28 h-28 object-contain rounded-lg bg-gray-100 mb-3 sm:mb-0"
                  />

                  <div className="text-center sm:text-left">
                    <h2 className="font-semibold text-lg text-gray-800">
                      {item.product?.name || "Unknown Product"}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {item.product?.category || "Category"} • Size {item.size}
                    </p>
                    <p className="text-purple-600 font-bold mt-1">
                      ₹{item.product?.price || 0} × {item.quantity}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center sm:justify-start space-x-2 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.size, item.quantity - 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-3 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.size, item.quantity + 1)
                        }
                        className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeFromCart(item.product._id, item.size)}
                  className="mt-4 md:mt-0 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-8 p-4 border-t text-right">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Total:{" "}
              <span className="text-purple-700">
                ₹
                {cart.items.reduce(
                  (sum, item) => sum + (item.product?.price || 0) * item.quantity,
                  0
                )}
              </span>
            </h2>
            <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
