import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  ShoppingCart,
  Package,
  MapPin,
  Edit,
  Eye,
  Key,
} from "lucide-react";

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateCartTotal = (cart) => {
    if (!cart || cart.length === 0) return "0.00";
    return cart
      .reduce(
        (total, item) => total + (item.price || 0) * (item.quantity || 0),
        0
      )
      .toFixed(2);
  };

  const handleEditProfile = () => {
    // Navigate to profile update page
    window.location.href = "/profileupdate";
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:3000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        console.log("Profile data:", data); // Debug log
          setUserData(data.user || data);
          console.log('data,', userData)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl mb-4">Failed to load profile</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold text-gray-800">User Profile</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mr-6 border-4 border-gray-200 relative">
                  {userData.picture && userData.picture.trim() !== "" ? (
                    <>
                      <img
                        src={userData.picture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log(
                            "Image failed to load:",
                            userData.picture
                          );
                          e.target.style.display = "none";
                          e.target.parentElement.querySelector(
                            ".fallback-icon"
                          ).style.display = "flex";
                        }}
                        onLoad={() => {
                          console.log(
                            "Image loaded successfully:",
                            userData.picture
                          );
                        }}
                      />
                      <div
                        className="fallback-icon w-full h-full flex items-center justify-center absolute top-0 left-0"
                        style={{ display: "none" }}
                      >
                        <User className="w-10 h-10 text-gray-400" />
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="w-10 h-10 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {userData.fullname || "User Name"}
                  </h2>
                  <p className="text-gray-600">
                    Member since {formatDate(userData.createdAt)}
                  </p>
                </div>
                <button
                  onClick={handleEditProfile}
                  className="ml-4 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  title="Edit Profile"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>

              {/* Profile Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-gray-800">
                      {userData.email || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Contact</p>
                    <p className="text-gray-800">
                      {userData.contact || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Address</p>
                    <p className="text-gray-800">
                      {userData.address || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">
                      Last Updated
                    </p>
                    <p className="text-gray-800">
                      {formatDate(userData.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Shopping Cart
                  </h3>
                </div>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  {userData.cart?.length || 0} items
                </span>
              </div>

              {userData.cart?.length > 0 ? (
                <div className="space-y-4">
                  {userData.cart.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div>
                        <h4 className="font-medium text-gray-800">
                          {item.productName || "Product Name"}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity || 0}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${(item.price || 0).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total: $
                          {((item.price || 0) * (item.quantity || 0)).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        Cart Total:
                      </span>
                      <span className="text-lg font-bold text-blue-600">
                        ${calculateCartTotal(userData.cart)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Package className="w-5 h-5 text-blue-600 mr-2" />
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Cart Items</span>
                  <span className="font-semibold text-blue-600">
                    {userData.cart?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Total Orders</span>
                  <span className="font-semibold text-green-600">
                    {userData.orders?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-600">Cart Value</span>
                  <span className="font-semibold text-purple-600">
                    ${calculateCartTotal(userData.cart)}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button
                  onClick={handleEditProfile}
                  className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Eye className="w-4 h-4 mr-2" />
                  View Orders
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <Key className="w-4 h-4 mr-2" />
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
