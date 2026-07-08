import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";

const CheckoutDialog = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://jengamart-0.onrender.com/api";

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const payload = {
      amount: totalPrice,
      phone: phone,
      county: county.trim(),
      town: town.trim(),
      metadata: { items }
    };

    try {
      const response = await fetch(`${API_BASE}/payments/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Correctly read the customized API error messages thrown by your backend controller
        throw new Error(data.message || "An unexpected validation or gateway error occurred.");
      }

      alert("Success! Check your phone for the verification prompt.");
      clearCart();
    } catch (err: any) {
      console.error("Checkout Failure:", err.message);
      setErrorMessage(err.message);
    } finaly {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold">Secure Delivery Checkout</h2>
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm font-medium">
          <strong>Error: </strong>{errorMessage}
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="07xxxxxxxx" 
            className="w-full border p-2 rounded mt-1 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery County</label>
          <input 
            type="text" 
            value={county} 
            onChange={(e) => setCounty(e.target.value)} 
            placeholder="e.g. Kisumu, Nairobi, Mombasa" 
            className="w-full border p-2 rounded mt-1 focus:ring-orange-500 focus:border-orange-500"
            required
          />
          <p className="text-xs text-gray-400 mt-1">Note: Matches are case-sensitive (e.g., 'Kisumu').</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Town / Area</label>
          <input 
            type="text" 
            value={town} 
            onChange={(e) => setTown(e.target.value)} 
            placeholder="e.g. Kondele, Westlands, CBD" 
            className="w-full border p-2 rounded mt-1 focus:ring-orange-500 focus:border-orange-500"
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg font-bold transition-colors disabled:bg-gray-400 mt-4"
        >
          {loading ? "Processing Securely..." : `Pay KES ${totalPrice.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutDialog;