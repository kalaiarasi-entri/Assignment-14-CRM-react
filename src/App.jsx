import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomersPage from "./pages/CustomersPage";
import CasesPage from "./pages/CasesPage";
import { isLogged, logout, getUserFromToken } from "./utils/auth";

function Private({ children }) {
  if (!isLogged()) return <Navigate to="/login" replace />;
  const user = getUserFromToken();
  if (!user || user.role !== "user") return <Navigate to="/login" replace />;
  return children;
}

function Navbar() {
  const logged = isLogged();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    window.dispatchEvent(new Event("authChange")); // 🔥 notify app
    navigate("/login");
  };

  return (
    <header className="flex items-center justify-between mb-8 container">
      {/* Centered CRM Title */}
      <div className="flex-1 flex justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">CRM</div>
          <div className="text-sm small">Manage customers & cases</div>
        </div>
      </div>

      {/* Right-side Navigation */}
      <nav className="flex items-center gap-2">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {logged && (
          <Link to="/customers" className="nav-link">
            Customers
          </Link>
        )}
        {logged && (
          <Link to="/cases" className="nav-link">
            Cases
          </Link>
        )}
        {!logged ? (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  const [authVersion, setAuthVersion] = useState(0);

  useEffect(() => {
    const handle = () => setAuthVersion((v) => v + 1);
    window.addEventListener("authChange", handle);
    return () => window.removeEventListener("authChange", handle);
  }, []);

  return (
    <BrowserRouter>
      <Navbar key={authVersion} /> {/* 🔥 remounts when auth changes */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/customers"
            element={
              <Private>
                <CustomersPage />
              </Private>
            }
          />
          <Route
            path="/cases"
            element={
              <Private>
                <CasesPage />
              </Private>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
