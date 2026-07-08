import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { kenyanLocations } from "../data/kenyanLocations";

const CheckoutDialog = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [phone, setPhone] = useState("");
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://jengamart-0.onrender.com/api";

  // Get available towns based on selected county
  const availableTowns = county ? kenyanLocations[county] : [];

  const handleCountyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCounty(e.target.value);
    setTown(""); // Reset town selection when county changes
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!county || !town) {
      setErrorMessage("Please select a valid County and Town from the options provided.");
      return;
    }

    setLoading(true);
    setErrorMessage("");

    const payload = {
      amount: totalPrice,
      phone: phone,
      county: county,
      town: town,
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
        throw new Error(data.message || "An error occurred during checkout processing.");
      }

      alert("Success! Check your phone for the M-Pesa push prompt.");
      clearCart();
    } catch (err: any) {
      console.error("Checkout Failure:", err.message);
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Secure Delivery Checkout</h2>
      
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
          <strong>Error: </strong>{errorMessage}
        </div>
      )}

      <form onSubmit={handleCheckoutSubmit} className="space-y-4">
        {/* Phone Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">M-Pesa Phone Number</label>
          <input 
            type="text" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="07xxxxxxxx" 
            className="w-full border p-2 rounded mt-1 bg-white focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        {/* Guided County Dropdown Menu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery County</label>
          <select
            value={county}
            onChange={handleCountyChange}
            className="w-full border p-2 rounded mt-1 bg-white focus:ring-2 focus:ring-orange-500 text-sm"
            required
          >
            <option value="">-- Select Your County --</option>
            {Object.keys(kenyanLocations).map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Guided Town Dropdown Menu */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Town / Area</label>
          <select
            value={town}
            onChange={(e) => setTown(e.target.value)}
            disabled={!county}
            className="w-full border p-2 rounded mt-1 bg-white focus:ring-2 focus:ring-orange-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
            required
          >
            <option value="">
              {county ? "-- Select Area / Town --" : "⚠️ Select a County First"}
            </option>
            {availableTowns.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-lg font-bold transition-colors disabled:bg-gray-400 mt-2"
        >
          {loading ? "Processing Securely..." : `Pay KES ${totalPrice.toLocaleString()}`}
        </button>
      </form>
    </div>
  );
};

export default CheckoutDialog;