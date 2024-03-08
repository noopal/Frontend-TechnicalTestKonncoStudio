import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListTransaction = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/checkout");
      setTransactions(response.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleBayar = async (transactionId) => {
    window.location.href = `/checkout/show/${transactionId}`;
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  const getStatusBadgeClass = (status) => {
    return status === "pending" ? "bg-red-500" : "bg-green-500";
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Daftar Transaksi</h1>
      {transactions.length === 0 ? (
        <p className="text-gray-500">Belum ada transaksi.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Produk</th>
                <th className="px-4 py-2">Harga</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Tanggal</th>
                <th className="px-4 py-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="text-sm">
                  <td className="border px-4 py-2">
                    {transaction.barang.nama_barang}
                  </td>
                  <td className="border px-4 py-2">{transaction.price}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`py-1 px-3 rounded-full text-white ${getStatusBadgeClass(
                        transaction.status
                      )}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    {formatDate(transaction.created_at)}
                  </td>
                  <td className="border px-4 py-2">
                    {transaction.status === "pending" && (
                      <button
                        onClick={() => handleBayar(transaction.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded">
                        Bayar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
};

export default ListTransaction;
