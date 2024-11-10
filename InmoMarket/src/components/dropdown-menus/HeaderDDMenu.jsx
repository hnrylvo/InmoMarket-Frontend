import React from "react";
import {
  FaHeart,
  FaLaptopHouse,
  FaSign,
  FaPowerOff,
  FaQuestionCircle,
} from "react-icons/fa";

export default function HeaderDDMenu({ onClose, menuRef }) {
  const menuItems = [
    { name: "Contacted", link: "/", icon: FaLaptopHouse },
    { name: "Favorites", link: "/", icon: FaHeart },
    { name: "My Ads", link: "/", icon: FaSign },
    { name: "Sell Property", link: "/sell-property", margin: true },
    { name: "Help", link: "/", icon: FaQuestionCircle, margin: true },
    { name: "Log Out", link: "/", icon: FaPowerOff },
  ];

  return (
    <div
      ref={menuRef}
      className="bg-white shadow-sm mt-12 lg:w-64 p-5 mr-4 rounded-lg absolute right-3 lg:right-0 z-50"
    >
      <ul>
        {menuItems.map((item, index) => (
          <li
            onClick={() => onClose()}
            key={index}
            className={`${
              item.margin ? "mt-10 lg:mt-16" : "mt-3 lg:mt-6"
            } flex items-center gap-4 lg:gap-6 px-4 lg:px-6 py-2 lg:py-3 cursor-pointer rounded-xl ${
              item.name === "Sell Property"
                ? "bg-secondary-green text-white hover:scale-[1.01] uppercase flex items-center justify-center"
                : "hover:bg-background-color"
            }`}
          >
            {item.name !== "Sell Property" && (
              <item.icon className="text-text-color w-4 h-4 lg:w-6 lg:h-6" />
            )}
            <a
              href={item.link}
              className="text-xs lg:text-lg font-medium hover:underline"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
