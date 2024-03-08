import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 

const Keranjang = () => {
  const [barangKeranjangs, setBarangKeranjangs] = useState([]);

  useEffect(() => {
    fetchKeranjangs();
  }, []);

  const fetchKeranjangs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/keranjang");
      setBarangKeranjangs(response.data.data);
    } catch (error) {
      console.error("Error fetching keranjangs:", error);
    }
  };

  const handleBayar = async (barangId, barangHrg) => {
    try {
      const response = await axios.post(`http://localhost:8000/api/checkout`, {
        product_id: barangId,
        price: barangHrg,
      });
      window.location.href = `/checkout/show/${response.data.data.id}`;
    } catch (error) {
      console.error("Error starting payment process:", error);
    }
  };
  console.log(barangKeranjangs.id);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Keranjang Belanja</h1>
      {barangKeranjangs.length === 0 ? (
        <p className="text-gray-500">Keranjang Anda kosong.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {barangKeranjangs.map((barang) => (
            <div
              key={barang.barang.id}
              className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold">
                {barang.barang.nama_barang}
              </h2>
              <p className="text-gray-500">
                Harga: Rp {barang.barang.harga_barang.toLocaleString()}
              </p>
              <div className="pt-3">
                <p>Jumlah : {barang.jumlah}</p>
                <p>
                  Total Harga :{" "}
                  {(
                    barang.barang.harga_barang * barang.jumlah
                  ).toLocaleString()}
                </p>
                <button
                  onClick={() =>
                    handleBayar(barang.barang.id, barang.barang.harga_barang)
                  }
                  className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">
                  Bayar
                </button>
              </div>
            </div>
          ))}
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

export default Keranjang;
