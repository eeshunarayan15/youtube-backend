import { useState, useEffect } from "react";

const CategoryForm = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Create new category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Category created!");
        setCategoryName("");
        fetchCategories();
      } else {
        alert(data.error || "Failed to create category");
      }
    } catch (err) {
      console.error("Error creating category:", err);
    }
  };

  // Add subcategory to selected category
  const handleAddSubcategory = async (e) => {
    e.preventDefault();
    if (!selectedCategoryId) return alert("Select a category first");

    try {
      const res = await fetch(
        `http://localhost:3000/categories/${selectedCategoryId}/subcategory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ name: subcategoryName }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert("Subcategory added!");
        setSubcategoryName("");
        fetchCategories();
      } else {
        alert(data.error || "Failed to add subcategory");
      }
    } catch (err) {
      console.error("Error adding subcategory:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Category</h1>
      <form onSubmit={handleCreateCategory} className="mb-6">
        <input
          type="text"
          placeholder="Category name"
          className="border p-2 rounded w-full mb-2"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create Category
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">Add Subcategory</h2>
      <form onSubmit={handleAddSubcategory}>
        <select
          className="border p-2 rounded w-full mb-2"
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Subcategory name"
          className="border p-2 rounded w-full mb-2"
          value={subcategoryName}
          onChange={(e) => setSubcategoryName(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Subcategory
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
