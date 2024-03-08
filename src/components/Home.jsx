import React, { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [barangs, setBarangs] = useState([]);

  useEffect(() => {
    fetchBarangs();
  }, []);

  const fetchBarangs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/barang");
      setBarangs(response.data.data);
    } catch (error) {
      console.error("Error fetching barangs:", error);
    }
  };

  const addToCart = async (barangId) => {
    try {
      const response = await axios.post("http://localhost:8000/api/keranjang", {
        barang_id: barangId,
        jumlah: 1,
      });
      window.location.href = "/keranjang";
      console.log("Added to cart:", response.data.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  console.log(barangs);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4">Daftar Barang</h1>
      <div className="grid grid-cols-3 gap-4">
        {barangs.map((barang) => (
          <div key={barang.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold">{barang.nama_barang}</h2>
            <p className="text-gray-700">{barang.deskripsi_barang}</p>
            <p className="text-gray-700">Harga: Rp {barang.harga_barang}</p>
            <p className="text-gray-700">Stok: {barang.stok}</p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => addToCart(barang.id)}>
              Tambah ke Keranjang
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
