import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-semibold">
          Home
        </Link>
        <div>
          <Link to="/keranjang" className="text-white mr-4">
            Keranjang
          </Link>
          <Link to="/list-transaction" className="text-white mr-4">
            Transaksi
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
