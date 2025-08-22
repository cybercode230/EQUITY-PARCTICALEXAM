// src/components/Orders/OrderForm.jsx
import { useEffect, useState, useContext } from "react";
import Api from "../../api/axiosConfig"
import { AuthContext } from "../../context/AuthContext";

const OrderForm = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, qty) => {
    setOrderItems((prev) => {
      const existing = prev.find((item) => item.product_id === productId);
      if (existing) {
        return prev.map((item) =>
          item.product_id === productId ? { ...item, quantity: qty } : item
        );
      } else {
        return [...prev, { product_id: productId, quantity: qty }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderItems.length) {
      setMessage("Please select at least one product.");
      return;
    }
    setLoading(true);
    try {
      await api.post("/orders", { items: orderItems });
      setMessage("Order placed successfully!");
      setOrderItems([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Error placing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Place an Order</h2>

      {message && <p className="mb-4 text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{product.name}</p>
              <p className="text-sm text-gray-500">${product.price}</p>
            </div>
            <input
              type="number"
              min="0"
              placeholder="Qty"
              value={
                orderItems.find((item) => item.product_id === product.id)
                  ?.quantity || ""
              }
              onChange={(e) =>
                handleQuantityChange(product.id, parseInt(e.target.value) || 0)
              }
              className="w-20 border rounded px-2 py-1"
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
