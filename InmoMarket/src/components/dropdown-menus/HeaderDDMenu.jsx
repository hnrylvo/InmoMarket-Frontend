import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaLaptopHouse,
  FaSign,
  FaPowerOff,
  FaQuestionCircle,
  FaUserShield, // Add an admin icon
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

export default function HeaderDDMenu({ onClose, menuRef }) {
  const navigate = useNavigate();
  const { removeToken, user } = useAuth(); // Destructure user from useAuth

  const handleLogout = async () => {
    try {
      await removeToken(); // This will handle the logout API call
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Determine if the user is an admin
  const isAdmin = user && user.role === "admin";

  const menuItems = [
    { name: "Contacted", link: "/", icon: FaLaptopHouse },
    { name: "Favorites", link: "/", icon: FaHeart },
    { name: "My Ads", link: "/my-publications", icon: FaSign },
    { name: "Sell Property", link: "/sell-property", margin: true },
    { name: "Help", link: "/", icon: FaQuestionCircle, margin: true },
    // Conditionally add admin dashboard item
    ...(isAdmin
      ? [
          {
            name: "Admin Dashboard",
            link: "/admin-dashboard",
            icon: FaUserShield,
            onClick: () => {
              onClose();
              navigate("/admin-dashboard");
            },
          },
        ]
      : []),
    {
      name: "Log Out",
      link: "#",
      icon: FaPowerOff,
      onClick: handleLogout,
    },
  ];

  return (
    <div
      ref={menuRef}
      className="absolute right-0 top-full bg-white shadow-lg rounded-xl z-50 w-64 lg:w-72 py-4"
    >
      {menuItems.map((item, index) => (
        <div
          onClick={() => {
            onClose();
            if (item.onClick) item.onClick();
            else if (item.link) navigate(item.link);
          }}
          key={index}
          className={`${
            item.margin ? "mt-10 lg:mt-16" : "mt-3 lg:mt-6"
          } flex items-center gap-4 lg:gap-6 px-4 lg:px-6 py-2 lg:py-3 cursor-pointer rounded-xl ${
            item.name === "Sell Property"
              ? "bg-secondary-green text-white hover:scale-[1.01] uppercase flex items-center justify-center"
              : item.name === "Admin Dashboard"
              ? "text-red-600 hover:bg-red-50" // Optional: Highlight admin dashboard
              : "hover:bg-background-color"
          }`}
        >
          {item.icon &&
            React.createElement(item.icon, { className: "w-5 h-5" })}
          {item.name}
        </div>
      ))}
    </div>
  );
}
