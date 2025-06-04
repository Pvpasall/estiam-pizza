import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menus from "./pages/Menus";
import Contact from "./pages/Contact";
import Paniers from "./pages/Paniers";
import { useState } from "react";
import AdminPage from "./pages/Admin";
import LoginPage from "./pages/Login";
import useAuth from "./hooks/use-auth"

function App() {
  const [cart, setCart] = useState([]);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };
  const location = useLocation();
  const hideNavbar =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/login");
  return (
    <>
     {!hideNavbar && <Navbar cartCount={cartCount} />}
      <Routes>
       
        <Route path="/" element={<Menus cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/panier"
          element={<Paniers cart={cart} handleRemove={handleRemove} />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default App;
