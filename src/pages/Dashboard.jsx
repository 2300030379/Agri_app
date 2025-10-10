import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MOCK_PRODUCTS = [
  { id: 1, name: "Tomatoes", price: 50, quantity: 100, icon: "🍅" },
  { id: 2, name: "Potatoes", price: 40, quantity: 120, icon: "🥔" },
  { id: 3, name: "Carrots", price: 60, quantity: 80, icon: "🥕" },
  { id: 4, name: "Spinach", price: 30, quantity: 60, icon: "🥬" },
];

const QUOTES = {
  en: [
    "Happy farming, healthy life!",
    "Grow your farm, grow your wealth!",
    "Farming is the backbone of our nation!"
  ],
  te: [
    "సంతోషంగా వ్యవసాయం, ఆరోగ్యకరమైన జీవితం!",
    "మీ రైతుల వ్యవసాయం పెంచండి, సంపద పెంచండి!",
    "వ్యవసాయం మన దేశానికి పునాది!"
  ]
};

export default function Dashboard({ lang }) {
  const [summary, setSummary] = useState({ totalProducts: 0 });
  const [topProducts, setTopProducts] = useState([]);
  const [quote, setQuote] = useState("");
  const [fade, setFade] = useState(true);

  const t = {
    en: { title: "Dashboard", products: "Total Products", viewProducts: "View Products", motivational: "Motivational Quote", topProducts: "Top Products" },
    te: { title: "డాష్‌బోర్డు", products: "మొత్తం ఉత్పత్తులు", viewProducts: "ఉత్పత్తులు చూడండి", motivational: "ప్రేరణాత్మక కోట్", topProducts: "ముఖ్య ఉత్పత్తులు" }
  };

  useEffect(() => {
    // Simulate API fetch
    setSummary({ totalProducts: MOCK_PRODUCTS.length });
    setTopProducts(MOCK_PRODUCTS.slice(0, 3));

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setQuote(QUOTES[lang][Math.floor(Math.random() * QUOTES[lang].length)]);
        setFade(true);
      }, 500);
    }, 8000);

    // Initialize first quote
    setQuote(QUOTES[lang][Math.floor(Math.random() * QUOTES[lang].length)]);

    return () => clearInterval(interval);
  }, [lang]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-extrabold text-center text-green-700 drop-shadow-md">{t[lang].title}</h2>

      {/* Summary Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/products" className="bg-gradient-to-r from-pink-50 via-green-50 to-blue-50 p-6 rounded-2xl shadow-lg backdrop-blur-md hover:shadow-2xl transition flex flex-col items-center transform hover:-translate-y-1">
          <p className="text-4xl font-bold text-green-600">{summary.totalProducts}</p>
          <p className="text-gray-700 mt-2">{t[lang].products}</p>
          <span className="mt-3 text-sm text-green-500 hover:underline">{t[lang].viewProducts}</span>
        </Link>
      </div>

      {/* Top Products */}
      <h3 className="text-2xl font-bold text-gray-700">{t[lang].topProducts}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {topProducts.map(p => (
          <div key={p.id} className="bg-white/50 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition flex flex-col items-center relative overflow-hidden">
            <div className="text-5xl animate-bounce">{p.icon}</div>
            <h4 className="font-bold text-green-700 mt-2 text-lg">{p.name}</h4>
            <p className="text-gray-700">₹{p.price}</p>
            <p className="text-gray-500">{lang === "en" ? "Qty" : "పరిమాణం"}: {p.quantity}</p>
            {/* Soft floating shapes */}
            <div className="absolute -top-4 -left-4 w-6 h-6 bg-pink-200 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-200 rounded-full opacity-50 animate-pulse"></div>
          </div>
        ))}
      </div>

      {/* Motivational Quote */}
      <div className={`bg-gradient-to-r from-yellow-100 via-yellow-200 to-yellow-100 p-4 rounded-2xl shadow-lg text-center font-semibold text-green-700 transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}>
        <span>{t[lang].motivational}: </span>
        <span className="italic">"{quote}"</span>
      </div>
    </div>
  );
}
