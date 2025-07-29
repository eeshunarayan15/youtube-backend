import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProductGrid from "./ProductGrid";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/products/api/products");
        const data = await res.json();
        console.log("Fetched products:", data);

        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
};

export default Product;
