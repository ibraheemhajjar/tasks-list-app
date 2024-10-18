import React, { useState, useRef } from "react";
import useClickOutside from "@/app/hooks/useClickOutside";

type SortOption = "asc" | "desc";

type SortDropdownProps = {
   onSort: (direction: SortOption) => void;
   currentDirection: SortOption;
};

const SortDropdown: React.FC<SortDropdownProps> = ({ onSort, currentDirection }) => {
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);

   useClickOutside(dropdownRef, () => setIsOpen(false));

   const toggleDropdown = () => setIsOpen(!isOpen);

   const handleSort = (option: SortOption) => {
      onSort(option);
      setIsOpen(false);
   };

   return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
         <div>
            <button
               type="button"
               className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
               id="sort-menu"
               aria-haspopup="true"
               aria-expanded="true"
               onClick={toggleDropdown}
            >
               Sort: {currentDirection === "asc" ? "Ascending" : "Descending"}
               <svg
                  className="-mr-1 ml-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
               >
                  <path
                     fillRule="evenodd"
                     d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                     clipRule="evenodd"
                  />
               </svg>
            </button>
         </div>

         {isOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
               <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="sort-menu">
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                     <input
                        type="radio"
                        name="sort-option"
                        value="asc"
                        checked={currentDirection === "asc"}
                        onChange={() => handleSort("asc")}
                        className="mr-2"
                     />
                     Ascending
                  </label>
                  <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                     <input
                        type="radio"
                        name="sort-option"
                        value="desc"
                        checked={currentDirection === "desc"}
                        onChange={() => handleSort("desc")}
                        className="mr-2"
                     />
                     Descending
                  </label>
               </div>
            </div>
         )}
      </div>
   );
};

export default SortDropdown;
