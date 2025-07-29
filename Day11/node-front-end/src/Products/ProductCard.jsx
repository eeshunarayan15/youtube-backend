import React from "react";
import { Plus } from "lucide-react";

const ProductCard = ({ id, name, price, image, bgColor }) => {
  return (
    <div className="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
      <div
        className={`${bgColor} rounded-t-lg p-8 flex items-center justify-center min-h-[200px]`}
      >
        <img
          src={image}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-600">₹ {price}</p>

        <button className="absolute bottom-4 right-4 w-8 h-8 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200">
          <Plus className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
