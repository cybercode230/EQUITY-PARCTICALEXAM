// src/components/Layout/Dashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ProductList from "../Products/ProductList";
import OrderForm from "../Orders/OrderForm";
import AllOrders from "../Orders/AllOrders";
import Navbar from "./Navbar";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
        <Navbar />
      <h1>Welcome {user.username} ({user.role})</h1>

      {/* Customer Dashboard */}
      {user.role === "customer" && (
        <>
          <h2>Products</h2>
          <ProductList />
          <h2>Place Order</h2>
          <OrderForm />
        </>
      )}

      {/* Admin Dashboard */}
      {user.role === "admin" && (
        <>
          <h2>Products (Manage)</h2>
          <ProductList adminView={true} />
          <h2>Orders</h2>
          <AllOrders adminView={true} />
        </>
      )}

      {/* Manager Dashboard */}
      {user.role === "manager" && (
        <>
          <h2>Orders</h2>
          <AllOrders managerView={true} />
        </>
      )}
    </div>
  );
};

export default Dashboard;
