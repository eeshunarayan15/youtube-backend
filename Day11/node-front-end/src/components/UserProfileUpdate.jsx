import React, { useState, useEffect } from "react";

const UserProfileUpdate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phoneNumber: "",
    picture: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch current user data on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("❌ No authentication token found");
          setFetchLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Profile data:", data); // Debug log

        // Handle different possible response structures
        const user = data.user || data;

        setFormData({
          fullName: user.fullname || user.fullName || "",
          address: user.address || "",
          phoneNumber: user.contact || user.phoneNumber || "",
          picture: user.picture || "",
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setMessage("❌ Failed to load profile data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Send data with correct field names that match backend expectations
      const updateData = {
        fullName: formData.fullName,
        address: formData.address,
        phoneNumber: formData.phoneNumber,
        picture: formData.picture,
      };

      console.log("Sending update data:", updateData); // Debug log

      const res = await fetch("http://localhost:3000/users/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();
      console.log("Update response:", data); // Debug log

      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }

      setMessage("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      setMessage("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
        <div className="text-center">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Update Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Picture URL
          </label>
          <input
            type="url"
            name="picture"
            placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            value={formData.picture}
            onChange={handleChange}
          />
          {formData.picture && (
            <div className="mt-2">
              <img
                src={formData.picture}
                alt="Profile preview"
                className="w-16 h-16 rounded-full object-cover border"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          onClick={handleSubmit}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>

        {message && (
          <div className="mt-2 text-center text-sm text-gray-700">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileUpdate;
