import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function Login({ lang }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const t = {
    en: { title: "Login", email: "Email", password: "Password", button: "Login" },
    te: { title: "లాగిన్", email: "ఇమెయిల్", password: "పాస్‌వర్డ్", button: "లాగిన్" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("token", "demo-token");
    alert(lang === "en" ? "Login successful" : "లాగిన్ సక్సెస్!");
    navigate("/dashboard");
  };

  // Soft pastel gradient background
  const gradientStyle = {
    background: "linear-gradient(-45deg, #a8edea, #fed6e3, #fef9d7, #c8f2c8)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite"
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={gradientStyle}>
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position:0% 50%;}
            50% {background-position:100% 50%;}
            100% {background-position:0% 50%;}
          }
        `}
      </style>

      <form className="w-full max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-700 drop-shadow-sm">{t[lang].title}</h2>

        {/* Email Input */}
        <div className="relative mb-6">
          <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
          <input 
            type="email" 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-10 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition" 
            placeholder={t[lang].email} 
            required
          />
          <label 
            htmlFor="email" 
            className={`absolute left-10 top-3 text-gray-400 text-sm transition-all pointer-events-none ${
              email ? "-top-2 text-xs text-blue-300" : ""
            }`}
          >
            {t[lang].email}
          </label>
        </div>

        {/* Password Input */}
        <div className="relative mb-8">
          <FaLock className="absolute top-3 left-3 text-gray-400" />
          <input 
            type="password" 
            id="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full px-10 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent transition" 
            placeholder={t[lang].password} 
            required
          />
          <label 
            htmlFor="password" 
            className={`absolute left-10 top-3 text-gray-400 text-sm transition-all pointer-events-none ${
              password ? "-top-2 text-xs text-indigo-300" : ""
            }`}
          >
            {t[lang].password}
          </label>
        </div>

        {/* Login Button */}
        <button 
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-200 via-blue-200 to-indigo-200 text-gray-700 font-semibold hover:scale-105 transition transform shadow-md"
        >
          {t[lang].button}
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600 text-sm">
          {lang === "en" ? "Don't have an account?" : "ఖాతా లేదా?"}{" "}
          <span className="underline cursor-pointer" onClick={() => navigate("/register")}>
            {lang === "en" ? "Register" : "రెజిస్టర్"}
          </span>
        </p>
      </form>
    </div>
  );
}
