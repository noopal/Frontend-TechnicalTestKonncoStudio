import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Transaction = () => {
  const [transaction, setTransaction] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetchTransaction();
    loadSnapScript();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/checkout/show/${id}`
      );
      setTransaction(response.data.data);
    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
  };

  const loadSnapScript = () => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = "SB-Mid-client-86xeGr_ka8ZxhM2L";

    if (!document.querySelector(`script[src="${snapScript}"]`)) {
      const script = document.createElement("script");
      script.src = snapScript;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
      document.body.appendChild(script);
    }
  };

  const handlePayButtonClick = async () => {
    if (window.snap && transaction.snap_token) {
      window.snap.pay(transaction.snap_token, {
        onSuccess: async function (result) {
          try {
            const response = await axios.put(
              `http://localhost:8000/api/checkout/update/${id}`,
              {
                transactionId: transaction.id,
                status: "success",
              }
            );
            console.log("Status transaksi diperbarui:", response.data);
          } catch (error) {
            console.error("Error updating transaction status:", error);
          }
          console.log("Pembayaran berhasil:", result);
          window.location.href = "/success";
        },
        onPending: function (result) {
          window.location.href = "/waiting";
        },
        onError: function (result) {
          console.error("Pembayaran gagal:", result);
        },
      });
    } else {
      console.error(
        "Snap.js belum dimuat atau token SNAP tidak tersedia. Harap tunggu sebentar."
      );
    }
  };

  return (
    <div className="container mx-auto my-10">
      <div className="flex justify-center items-center h-full">
        <div className="mx-auto bg-white rounded-lg shadow-md p-4 w-96">
          {transaction && Object.keys(transaction).length > 0 ? (
            <>
              <p className="text-center">
                Anda akan melakukan pembayaran untuk produk{" "}
                <span className="font-bold">
                  {transaction.barang ? transaction.barang.nama_barang : ""}
                </span>{" "}
                dengan harga{" "}
                <span className="font-bold">{transaction.price}</span>
              </p>
              <div className="py-3">
                <button
                  id="pay-button"
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
                  onClick={handlePayButtonClick}>
                  Bayar
                </button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transaction;
