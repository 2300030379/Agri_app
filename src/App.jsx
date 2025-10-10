import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import MarketTrends from "./pages/MarketTrends";
import Payment from "./pages/Payment";

export default function App() {
  const [lang, setLang] = useState("en"); // 'en' or 'te'
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect to login after logout
  };

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navbar */}
      <nav className="bg-green-600 p-4 text-white flex flex-wrap justify-between items-center">
        <div className="flex gap-4 items-center">
          <Link to="/" className="hover:underline">{lang === "en" ? "Products" : "ఉత్పత్తులు"}</Link>
          <Link to="/dashboard" className="hover:underline">{lang === "en" ? "Dashboard" : "డాష్‌బోర్డు"}</Link>
          <Link to="/trends" className="hover:underline">{lang === "en" ? "Market Trends" : "మార్కెట్ ట్రెండ్స్"}</Link>
          <Link to="/payment" className="hover:underline">{lang === "en" ? "Payment" : "చెల్లింపు"}</Link>
        </div>

        <div className="flex gap-4 items-center">
          {/* Language Dropdown */}
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="text-black p-1 rounded"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
          </select>

          {!token && (
            <>
              <Link to="/login" className="hover:underline">{lang === "en" ? "Login" : "లాగిన్"}</Link>
              <Link to="/register" className="hover:underline">{lang === "en" ? "Register" : "రెజిస్టర్"}</Link>
            </>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              {lang === "en" ? "Logout" : "లాగ్ అవుట్"}
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Products lang={lang} />} />
          <Route path="/dashboard" element={<Dashboard lang={lang} />} />
          <Route path="/trends" element={<MarketTrends lang={lang} />} />
          <Route path="/login" element={<Login lang={lang} />} />
          <Route path="/register" element={<Register lang={lang} />} />
          <Route path="/payment" element={<Payment lang={lang} />} />
        </Routes>
      </div>
    </div>
  );
}




