import { useState } from "react";
import api from "../api/axios";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/transactions", {
        amount: parseFloat(amount),
        type,
        note,
        date,
      });
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add Transaction</h1>
            <p className="text-gray-600 mt-2">Record a new income or expense</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p className="font-semibold">Error</p>
              <p className="text-sm mt-1">{error}</p>
            </div>
          )}

          <form onSubmit={submit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="income">📈 Income</option>
                <option value="expense">📉 Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
              <input 
                type="number" 
                step="0.01"
                min="0"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Note (Optional)</label>
              <input 
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add a note..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input 
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition"
            >
              {loading ? "Saving..." : "Save Transaction"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/dashboard" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
