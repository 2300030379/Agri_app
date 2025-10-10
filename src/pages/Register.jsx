import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default function Register({ lang }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const t = {
    en: { title: "Register", name: "Name (optional)", email: "Email", password: "Password", button: "Register" },
    te: { title: "రెజిస్టర్", name: "పేరు (ఐచ్ఛికం)", email: "ఇమెయిల్", password: "పాస్‌వర్డ్", button: "రెజిస్టర్" },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(lang === "en" ? "Registered successfully!" : "సక్సెస్‌గా రిజిస్టర్ అయ్యారు!");
    localStorage.setItem("token", "demo-token");
    navigate("/dashboard");
  };

  // Soft pastel gradient background
  const gradientStyle = {
    background: "linear-gradient(-45deg, #a8edea, #fed6e3, #fef9d7, #c8f2c8)",
    backgroundSize: "400% 400%",
    animation: "gradientBG 15s ease infinite"
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      style={gradientStyle}
    >
      <style>
        {`
          @keyframes gradientBG {
            0% {background-position:0% 50%;}
            50% {background-position:100% 50%;}
            100% {background-position:0% 50%;}
          }
        `}
      </style>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md bg-white/50 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-700 drop-shadow-sm">{t[lang].title}</h2>

        {/* Name Input */}
        <div className="relative mb-6">
          <FaUser className="absolute top-3 left-3 text-gray-400" />
          <input 
            type="text" 
            id="name"
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-10 py-3 rounded-lg border border-gray-300 bg-white placeholder-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent transition" 
            placeholder={t[lang].name}
          />
          <label 
            htmlFor="name" 
            className={`absolute left-10 top-3 text-gray-400 text-sm transition-all pointer-events-none ${
              name ? "-top-2 text-xs text-pink-300" : ""
            }`}
          >
            {t[lang].name}
          </label>
        </div>

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

        {/* Register Button */}
        <button 
          className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-200 via-blue-200 to-indigo-200 text-gray-700 font-semibold hover:scale-105 transition transform shadow-md"
        >
          {t[lang].button}
        </button>

        {/* Login Link */}
        <p className="text-center mt-4 text-gray-600 text-sm">
          {lang === "en" ? "Already have an account?" : "ఇప్పుడే ఖాతా ఉందా?"}{" "}
          <span className="underline cursor-pointer" onClick={() => navigate("/login")}>
            {lang === "en" ? "Login" : "లాగిన్"}
          </span>
        </p>
      </form>
    </div>
  );
}
