import { useEffect, useState } from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const MOCK_TRENDS = [
  { name: "Tomatoes", averagePrice: 50 },
  { name: "Potatoes", averagePrice: 40 },
  { name: "Carrots", averagePrice: 60 },
  { name: "Onions", averagePrice: 55 },
  { name: "Spinach", averagePrice: 30 },
];

const ICONS = { Tomatoes: "🍅", Potatoes: "🥔", Carrots: "🥕", Onions: "🧅", Spinach: "🥬" };

export default function MarketTrends({ lang }) {
  const [trends, setTrends] = useState(MOCK_TRENDS);
  const [prevTrends, setPrevTrends] = useState(MOCK_TRENDS);

  const t = {
    en: { title: "Market Trends", avgPrice: "Average Price", priceChange: "Change" },
    te: { title: "మార్కెట్ ట్రెండ్స్", avgPrice: "సగటు ధర", priceChange: "మార్పు" },
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevTrends(trends);
      setTrends(trends.map(p => {
        const change = Math.floor(Math.random() * 11) - 5; // -5 to +5
        return { ...p, averagePrice: Math.max(p.averagePrice + change, 1), change };
      }));
    }, 5000); // update every 5 seconds
    return () => clearInterval(interval);
  }, [trends]);

  const getPriceChange = (name) => {
    const prev = prevTrends.find(p => p.name === name);
    const curr = trends.find(p => p.name === name);
    if (!prev || !curr) return "→";
    if (curr.averagePrice > prev.averagePrice) return "↑";
    if (curr.averagePrice < prev.averagePrice) return "↓";
    return "→";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const change = getPriceChange(data.name);
      const color = change === "↑" ? "#16a34a" : change === "↓" ? "#dc2626" : "#6b7280";
      return (
        <div className="bg-white border p-3 rounded-lg shadow-lg">
          <p className="font-bold text-xl" style={{ color }}>{ICONS[data.name] || "📦"} {data.name}</p>
          <p>{t[lang].avgPrice}: ₹{data.averagePrice}</p>
          <p>{t[lang].priceChange}: {change}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-700 mb-6">{t[lang].title}</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={trends} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="4 4" stroke="#d1d5db" />
          <XAxis dataKey="name" tickFormatter={name => `${ICONS[name] || "📦"} ${name}`} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="averagePrice" radius={[8, 8, 0, 0]} isAnimationActive animationDuration={1000}>
            {trends.map((entry, index) => {
              const prev = prevTrends[index]?.averagePrice || entry.averagePrice;
              const color = entry.averagePrice > prev ? "url(#gradGreen)" :
                            entry.averagePrice < prev ? "url(#gradRed)" : "#22c55e";
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
          </Bar>
          {/* Define gradients */}
          <defs>
            <linearGradient id="gradGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#6ee7b7" stopOpacity={0.7}/>
            </linearGradient>
            <linearGradient id="gradRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f87171" stopOpacity={0.9}/>
              <stop offset="100%" stopColor="#fecaca" stopOpacity={0.7}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
