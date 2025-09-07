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

  // ✅ Update quantity (increase or decrease)
  const updateQuantity = async (productId, size, newQuantity) => {
    if (newQuantity < 1) return; // don’t allow 0
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center border p-3 rounded shadow"
              >
                <div>
                  <h2 className="font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">
                    {item.product.category} • Size {item.size}
                  </p>
                  <p className="text-purple-600 font-bold">
                    ₹{item.product.price} × {item.quantity}
                  </p>

                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2 mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.size, item.quantity - 1)
                      }
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.size, item.quantity + 1)
                      }
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.product._id, item.size)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xl font-bold">
            Total: ₹
            {cart.items.reduce(
              (sum, item) => sum + item.product.price * item.quantity,
              0
            )}
          </div>
        </>
      )}
    </div>
  );
}
