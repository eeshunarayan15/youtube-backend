import React from "react";
import { ChevronDown } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 min-h-screen">
      <div className="space-y-6">
        {/* Sort Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-600">sort by</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            New Collection
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            All Products
          </a>
          <a
            href="#"
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            Discounted Products
          </a>
        </nav>

        {/* Filters */}
        <div className="pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Filter by:</h3>
          <div className="space-y-3">
            <button className="block text-gray-700 hover:text-blue-600 transition-colors">
              Availability
            </button>
            <button className="block text-gray-700 hover:text-blue-600 transition-colors">
              Discount
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
