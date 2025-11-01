import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import Lottie from "lottie-react";
import successAnim from "../assets/success.json";

export default function Payment() {
  const [method, setMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [success, setSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handlePayment = () => {
    if (!amount || !method) {
      alert("Please enter amount and select a payment method.");
      return;
    }
    const id = "TXN" + Math.floor(Math.random() * 1000000);
    setTxnId(id);
    const txn = { id, amount, method, time: new Date().toLocaleString() };
    setTransactions([txn, ...transactions]);
    setSuccess(true);
  };

  const downloadReceipt = () => {
    const receipt = document.getElementById("receipt");
    html2canvas(receipt).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("receipt.pdf");
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        backgroundColor: "#eefcf0",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "440px",
          background: "#fff",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#0c6b24", marginBottom: "20px" }}>
          Payment Portal
        </h2>

        {!success ? (
          <>
            <label>Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="₹ Amount"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                marginBottom: "15px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />

            <label>Select Payment Method</label>
            <select
              value={method}
              onChange={e => setMethod(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "15px",
              }}
            >
              <option value="">Select</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
              <option value="wallet">Wallet</option>
            </select>

            {method === "card" && (
              <div style={{ marginTop: "10px" }}>
                <label>Card Number</label>
                <input
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  maxLength="16"
                  placeholder="XXXX XXXX XXXX XXXX"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    value={expiry}
                    onChange={e => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    maxLength="5"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                  <input
                    value={cvv}
                    onChange={e => setCvv(e.target.value)}
                    placeholder="CVV"
                    maxLength="3"
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                    }}
                  />
                </div>
              </div>
            )}

            {method === "upi" && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <label>UPI ID</label>
                <input
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="example@upi"
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "8px",
                    marginBottom: "15px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
                {upiId && amount && (
                  <div>
                    <QRCodeCanvas value={`upi://pay?pa=${upiId}&am=${amount}&cu=INR`} size={150} />
                    <p style={{ marginTop: "10px", color: "#0c6b24" }}>
                      Scan to Pay ₹{amount}
                    </p>
                  </div>
                )}
              </div>
            )}

            {method === "wallet" && (
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <p>Select Wallet:</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                  <button
                    style={{
                      background: "#00baf2",
                      color: "#fff",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Paytm
                  </button>
                  <button
                    style={{
                      background: "#34a853",
                      color: "#fff",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Google Pay
                  </button>
                  <button
                    style={{
                      background: "#5e2ced",
                      color: "#fff",
                      border: "none",
                      padding: "8px 15px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    PhonePe
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handlePayment}
              style={{
                width: "100%",
                padding: "12px",
                background: "#0c6b24",
                color: "#fff",
                borderRadius: "8px",
                border: "none",
                marginTop: "25px",
                cursor: "pointer",
              }}
            >
              Pay Now
            </button>
          </>
        ) : (
          <div id="receipt" style={{ textAlign: "center" }}>
            <Lottie
              animationData={successAnim}
              loop={false}
              style={{ height: 150, width: 150, margin: "auto" }}
            />
            <h3 style={{ color: "#0c6b24", marginTop: "10px" }}>Payment Successful!</h3>
            <p>
              <b>Amount:</b> ₹{amount}
            </p>
            <p>
              <b>Method:</b> {method}
            </p>
            <p>
              <b>Transaction ID:</b> {txnId}
            </p>

            <div style={{ marginTop: "15px" }}>
              <button
                onClick={() => setSuccess(false)}
                style={{
                  background: "#0c6b24",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Make Another Payment
              </button>
              <button
                onClick={downloadReceipt}
                style={{
                  background: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  margin: "5px",
                  cursor: "pointer",
                }}
              >
                Download Receipt
              </button>
            </div>
          </div>
        )}

        <div style={{ marginTop: "25px" }}>
          <h4 style={{ color: "#0c6b24" }}>Recent Transactions</h4>
          {transactions.length > 0 ? (
            transactions.map((t, i) => (
              <div
                key={i}
                style={{
                  background: "#f6fff8",
                  marginTop: "10px",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d8f3dc",
                }}
              >
                <p>
                  <b>₹{t.amount}</b> — {t.method}
                </p>
                <small>
                  {t.id} | {t.time}
                </small>
              </div>
            ))
          ) : (
            <p>No previous transactions</p>
          )}
        </div>
      </div>
    </div>
  );
}
