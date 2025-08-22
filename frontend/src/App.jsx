import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Layout/Landing";
import Login from "./components/ Auth/Login";
import Register from "./components/ Auth/Register";
import ProductList from "./components/Products/ProductList";
import OrderForm from "./components/Orders/OrderForm";
import PrivateRoute from "./components/Layout/PrivateRoute";
import Dashboard from "./components/Layout/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <ProductList />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/order"
          element={
            <PrivateRoute allowedRoles={["customer"]}>
              <OrderForm />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
