import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../bars/search-bar/SearchBar";
import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import HeaderDDMenu from "../dropdown-menus/HeaderDDMenu";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();
  const profileRef = useRef();

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center w-full bg-background-color justify-between py-6 lg:px-4 top-0 px-0 fixed z-10">
      <div className="hidden w-1/3 lg:w-1/4 lg:flex justify-start">
        <h1 className="text-xl lg:text-2xl font-semibold">InmoMarket</h1>
      </div>

      <div className="flex-grow">
        <SearchBar />
      </div>

      <div className="flex items-center gap-4 w-1/3 lg:w-1/4 justify-evenly">
        <div className="flex items-center gap-2">
          <FaRegBell className="text-text-color w-7 h-7 lg:w-8 lg:h-8" />
          <a
            href="/"
            className="hidden lg:block text-sm lg:text-base font-medium hover:underline"
          >
            Notifications
          </a>
        </div>

        <div
          ref={profileRef}
          onClick={() => setShowMenu(!showMenu)}
          className="lg:relative flex flex-col items-center cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-text-color w-7 h-7 lg:w-8 lg:h-8" />
            <p className="hidden lg:block text-sm lg:text-base font-medium hover:underline">
              Profile
            </p>
          </div>

          {showMenu && (
            <HeaderDDMenu
              onClose={() => setShowMenu(false)}
              menuRef={menuRef}
            />
          )}
        </div>
      </div>
    </div>
  );
}
