import React from "react";

export default function SearchBar() {
  return (
    <div className="pr-4 w-full flex items-center">
      <input
        type="text"
        className="w-full p-2 sm:p-3 lg:p-4 border-2 border-gray-200 rounded-xl bg-alternative font-semibold text-primary-color focus:border-secondary-green focus:outline-none"
        placeholder="Search..."
      />
    </div>
  );
}
