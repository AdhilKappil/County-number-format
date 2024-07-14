import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const CustomDropdown = ({ 
  options, 
  selectedValue, 
  onSelect, 
  displayKey, 
  valueKey, 
  placeholder, 
  showOnlyDisplayKey = false,
  showCountryName = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter options based on search term
  const filteredOptions = options.filter((option) =>
    option[displayKey].toLowerCase().includes(searchTerm.toLowerCase()) ||
    (showCountryName && option.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

   // Handle option selection
  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative">
      <div
        className="border p-4 rounded cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? selectedValue[displayKey] : placeholder}
        <IoMdArrowDropdown size={20} />
      </div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b"
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option[valueKey]}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {showOnlyDisplayKey ? (
                  option[displayKey]
                ) : (
                  <>
                    {option[displayKey]} 
                    {showCountryName && ` (${option.name})`}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;