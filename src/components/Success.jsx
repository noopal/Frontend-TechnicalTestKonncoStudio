import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold text-green-600 mb-4">
        Pembayaran Berhasil!
      </h1>
      <p className="text-lg text-gray-700 mb-8">
        Terima kasih telah melakukan pembayaran.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default Success;
