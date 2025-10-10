import { useState } from "react";

export default function Payment({ lang }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const [method, setMethod] = useState("upi");

  const t = {
    en: {
      title: "Payment",
      placeholder: "Enter Amount",
      payButton: "Pay Now",
      success: "Payment Successful!",
      fail: "Payment Failed!",
      methods: { upi: "UPI / QR", card: "Card", cash: "Cash" },
      upiPlaceholder: "Enter UPI ID",
      cardPlaceholder: "Card Number",
    },
    te: {
      title: "చెల్లింపు",
      placeholder: "మొత్తం మొత్తం నమోదు చేయండి",
      payButton: "ఇప్పుడు చెల్లించండి",
      success: "చెల్లింపు సక్సెస్!",
      fail: "చెల్లింపు విఫలమైంది!",
      methods: { upi: "UPI / QR", card: "కార్డు", cash: "నగదు" },
      upiPlaceholder: "UPI ID నమోదు చేయండి",
      cardPlaceholder: "కార్డు నంబర్",
    }
  };

  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handlePayment = () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert(lang === "en" ? "Enter valid amount" : "చెల్లించడానికి సరైన మొత్తం నమోదు చేయండి");
      return;
    }

    if (method === "upi" && !upiId) {
      alert(lang === "en" ? "Enter valid UPI ID" : "సరైన UPI ID నమోదు చేయండి");
      return;
    }

    if (method === "card" && (!cardNumber || cardNumber.length < 12)) {
      alert(lang === "en" ? "Enter valid card number" : "సరైన కార్డు నంబర్ నమోదు చేయండి");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const success = Math.random() > 0.2; // 80% success
      if (success) {
        setSuccessAnim(true);
        setTimeout(() => setSuccessAnim(false), 2000);
        alert(t[lang].success);
        setAmount(""); setUpiId(""); setCardNumber("");
      } else {
        alert(t[lang].fail);
      }
    }, 2000);
  };

  return (
    <div 
      className="max-w-md mx-auto mt-10 p-6 rounded-2xl shadow-xl relative overflow-hidden"
      style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)" }}
    >
      {/* Success confetti */}
      {successAnim && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-burst"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random()}s`
              }}
            ></div>
          ))}
        </div>
      )}

      <h2 className="text-2xl font-extrabold mb-6 text-center text-green-700 drop-shadow-md">{t[lang].title}</h2>

      {/* Payment Methods */}
      <div className="flex justify-around mb-6">
        {["upi", "card", "cash"].map(m => (
          <button
            key={m}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              method === m 
                ? "bg-green-600 text-white shadow-lg" 
                : "bg-white/30 text-gray-700 hover:bg-green-100"
            }`}
            onClick={() => setMethod(m)}
          >
            {t[lang].methods[m]}
          </button>
        ))}
      </div>

      {/* Amount Input */}
      <div className="relative mb-4">
        <input 
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 pt-5 pb-2 rounded-lg bg-white/30 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          placeholder={t[lang].placeholder}
        />
        <label 
          className={`absolute left-4 top-2 text-gray-600 text-sm transition-all pointer-events-none ${
            amount ? "text-xs -top-1 text-green-600" : ""
          }`}
        >
          {t[lang].placeholder}
        </label>
      </div>

      {/* Conditional Inputs */}
      {method === "upi" && (
        <div className="relative mb-4">
          <input 
            type="text"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-4 pt-5 pb-2 rounded-lg bg-white/30 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder={t[lang].upiPlaceholder}
          />
          <label 
            className={`absolute left-4 top-2 text-gray-600 text-sm transition-all pointer-events-none ${
              upiId ? "text-xs -top-1 text-green-600" : ""
            }`}
          >
            {t[lang].upiPlaceholder}
          </label>
        </div>
      )}

      {method === "card" && (
        <div className="relative mb-4">
          <input 
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="w-full px-4 pt-5 pb-2 rounded-lg bg-white/30 placeholder-transparent text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            placeholder={t[lang].cardPlaceholder}
          />
          <label 
            className={`absolute left-4 top-2 text-gray-600 text-sm transition-all pointer-events-none ${
              cardNumber ? "text-xs -top-1 text-green-600" : ""
            }`}
          >
            {t[lang].cardPlaceholder}
          </label>
        </div>
      )}

      {/* Pay Button */}
      <button
        className={`w-full py-3 rounded-lg font-semibold text-white text-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition relative overflow-hidden shadow-lg`}
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing...</span>
          </div>
        ) : t[lang].payButton}
      </button>

      <style>
        {`
          @keyframes burst {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-80px) scale(0.5); opacity: 0; }
          }
          .animate-burst {
            animation: burst 1s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
