import { useEffect, useState } from "react";

const MOCK_PRODUCTS = [
  { id: 1, name: "Tomatoes", price: 50, quantity: 100 },
  { id: 2, name: "Potatoes", price: 40, quantity: 120 },
  { id: 3, name: "Carrots", price: 60, quantity: 80 },
  { id: 4, name: "Spinach", price: 30, quantity: 60 },
];

const ICONS = { Tomatoes: "🍅", Potatoes: "🥔", Carrots: "🥕", Spinach: "🥬" };

export default function Products({ lang }) {
  const [products, setProducts] = useState([]);
  const [prevProducts, setPrevProducts] = useState([]);
  const [floatingIcons, setFloatingIcons] = useState([]);

  const t = {
    en: { title: "Products", price: "Price", quantity: "Quantity" },
    te: { title: "ఉత్పత్తులు", price: "ధర", quantity: "పరిమాణం" },
  };

  useEffect(() => {
    setTimeout(() => {
      setProducts(MOCK_PRODUCTS);
      setPrevProducts(MOCK_PRODUCTS);
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevProducts(products);
      const newProducts = products.map(p => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        const newQty = Math.max(p.quantity + change, 0);
        return { ...p, quantity: newQty, change };
      });
      setProducts(newProducts);

      // Add floating icons for visual effect
      const icons = newProducts
        .filter((p, idx) => p.change !== 0)
        .map((p, idx) => ({
          id: `${p.id}-${Date.now()}`,
          emoji: p.change > 0 ? "⬆️" : "⬇️",
          color: p.change > 0 ? "#10b981" : "#ef4444",
          left: `${20 + idx * 25}%`,
          productId: p.id,
        }));
      setFloatingIcons(icons);

      // Remove icons after 1.5s
      setTimeout(() => setFloatingIcons([]), 1500);
    }, 5000);
    return () => clearInterval(interval);
  }, [products]);

  const getBarColor = (product) => {
    if (!prevProducts.length) return "#34d399";
    const prev = prevProducts.find(p => p.id === product.id);
    if (!prev) return "#34d399";
    return product.quantity > prev.quantity ? "#10b981" : product.quantity < prev.quantity ? "#ef4444" : "#34d399";
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-6 font-bold text-center text-green-700">{t[lang].title}</h2>
      <div className="relative">
        {/* Floating Icons */}
        {floatingIcons.map(icon => (
          <div
            key={icon.id}
            style={{
              position: "absolute",
              left: icon.left,
              bottom: "60px",
              color: icon.color,
              fontSize: "1.5rem",
              animation: "floatUp 1.5s ease-out forwards",
            }}
          >
            {icon.emoji}
          </div>
        ))}
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative z-10">
          {products.map((p) => (
            <li
              key={p.id}
              className="bg-gradient-to-br from-pink-50 via-green-50 to-blue-50 p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 relative"
            >
              <div className="text-4xl text-center mb-2">{ICONS[p.name] || "📦"}</div>
              <h3 className="font-bold text-lg text-center text-gray-700 mb-1">{p.name}</h3>
              <p className="text-gray-600 text-center mb-2">{t[lang].price}: ₹{p.price}</p>
              <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-1">
                <div
                  className="h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(p.quantity, 120)}%`, backgroundColor: getBarColor(p) }}
                ></div>
              </div>
              <p className="text-gray-500 text-sm text-center">{t[lang].quantity}: {p.quantity}</p>
            </li>
          ))}
        </ul>
      </div>

      <style>
        {`
          @keyframes floatUp {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(-40px); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}
