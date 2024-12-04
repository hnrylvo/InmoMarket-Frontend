import React, { useEffect, useRef, useState } from "react";
import SearchBar from "../bars/search-bar/SearchBar";
import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import HeaderDDMenu from "../dropdown-menus/HeaderDDMenu";
import axios from 'axios';

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const menuRef = useRef();
  const profileRef = useRef();

  // Default placeholder image
  const defaultProfileImage = 'https://via.placeholder.com/50?text=User';

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('https://inmomarket.me/api/v1/users/me', {
          withCredentials: true
        });
        
        // Validate and sanitize profile picture URL
        const profilePicture = response.data.profilePicture 
          ? response.data.profilePicture.trim() 
          : defaultProfileImage;
        
        setUserInfo({
          ...response.data,
          profilePicture: profilePicture
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    const checkAuthentication = async () => {
      try {
        const response = await axios.get('https://inmomarket.me/api/v1/auth/check', {
          withCredentials: true
        });
        
        if (response.data.authenticated) {
          fetchUserInfo();
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
      }
    };

    checkAuthentication();

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
    <div className="flex items-center w-full bg-background-color justify-between py-6 lg:px-4 top-0 px-3 fixed z-10">
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
            {userInfo ? (
              <>
                <img 
                  src={userInfo.profilePicture || defaultProfileImage}
                  alt="Profile" 
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    e.target.src = defaultProfileImage;
                  }}
                  className="w-7 h-7 lg:w-8 lg:h-8 rounded-full object-cover"
                />
                <p className="hidden lg:block text-sm lg:text-base font-medium hover:underline">
                  {userInfo.name || 'User'}
                </p>
              </>
            ) : (
              <>
                <FaRegUserCircle className="text-text-color w-7 h-7 lg:w-8 lg:h-8" />
                <p className="hidden lg:block text-sm lg:text-base font-medium hover:underline">
                  Profile
                </p>
              </>
            )}
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