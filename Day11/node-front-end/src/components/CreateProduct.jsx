import React, { useState, useEffect } from "react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    productImage: "",
    productName: "",
    productPrice: "",
    discountPrice: "",
    backgroundColor: "",
    panelColor: "",
    textColor: "",
    categoryId: "",
    subcategory: "",
  });

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error loading categories:", err.message);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const selectedCategory = categories.find(
      (cat) => cat._id === formData.categoryId
    );
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories || []);
    } else {
      setSubcategories([]);
    }
  }, [formData.categoryId, categories]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const payload = {
        name: formData.productName,
        price: formData.productPrice,
        discount: formData.discountPrice,
        image: formData.productImage,
        bgColor: formData.backgroundColor,
        panelColor: formData.panelColor,
        textColor: formData.textColor,
        categoryId: formData.categoryId,
        subcategory: formData.subcategory,
      };

      const response = await fetch(
        "http://localhost:3000/products/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong");
      }

      console.log("Product created:", result);
      alert("Product created successfully!");
    } catch (err) {
      console.error("Product creation failed:", err.message);
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="w-64 bg-white shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-8">Scatch</h1>
          <nav className="space-y-2">
            <a
              href="#"
              className="block px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg"
            >
              All Products
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-gray-800 bg-gray-100 rounded-lg font-medium"
            >
              Create new product
            </a>
          </nav>
        </div>
      </div>

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            Create New Product
          </h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Product Details
              </h3>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Product Image
                </label>
                <input
                  type="url"
                  name="productImage"
                  value={formData.productImage}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg"
                  placeholder="Enter image URL"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Product Price
                  </label>
                  <input
                    type="number"
                    name="productPrice"
                    value={formData.productPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Discount Price
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  value={formData.discountPrice}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border-0 rounded-lg"
                  placeholder="Enter discount price"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border-0 rounded-lg"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Subcategory
                </label>
                <select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 px-4 py-3 bg-gray-50 border-0 rounded-lg"
                >
                  <option value="">Select subcategory</option>
                  {subcategories.map((sub) => (
                    <option key={sub._id} value={sub.name}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Panel Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Background Color
                  </label>
                  <input
                    type="color"
                    name="backgroundColor"
                    value={formData.backgroundColor}
                    onChange={handleInputChange}
                    className="w-full h-12 px-2 py-1 bg-gray-50 border-0 rounded-lg cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Panel Color
                  </label>
                  <input
                    type="color"
                    name="panelColor"
                    value={formData.panelColor}
                    onChange={handleInputChange}
                    className="w-full h-12 px-2 py-1 bg-gray-50 border-0 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Text Color
                </label>
                <input
                  type="color"
                  name="textColor"
                  value={formData.textColor}
                  onChange={handleInputChange}
                  className="w-full md:w-1/2 h-12 px-2 py-1 bg-gray-50 border-0 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="px-8 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600"
              >
                Create New Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
