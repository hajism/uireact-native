import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../auth/auth";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/api/transactions");
        setData(res.data || []);
      } catch (err) {
        setError("Failed to load transactions");
        if (err.response?.status === 401) {
          logout();
          window.location.href = "/";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;

    try {
      await api.delete(`/api/transactions/${id}`);
      setData(data.filter(tx => tx.id !== id));
    } catch (err) {
      setError("Failed to delete transaction");
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg text-gray-600">Loading...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">💰 Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your transactions</p>
          </div>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <div className="mb-6">
          <a 
            href="/add" 
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition shadow-md hover:shadow-lg"
          >
            + Add Transaction
          </a>
        </div>

        {data.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">No transactions yet. Create your first one!</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Note</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((tx, idx) => (
                  <tr key={tx.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        tx.type === "income" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-red-100 text-red-800"
                      }`}>
                        {tx.type === "income" ? "📈 Income" : "📉 Expense"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{typeof tx.amount === 'number' ? tx.amount.toFixed(2) : tx.amount}</td>
                    <td className="px-6 py-4 text-gray-600">{tx.note || "-"}</td>
                    <td className="px-6 py-4 text-gray-600">{new Date(tx.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleDelete(tx.id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-semibold transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
