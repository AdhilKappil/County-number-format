import React, { useEffect, useRef, useState } from "react";
import { contryCodeObj } from "../data/countries";
import { useNavigate } from "react-router-dom";
import { usePhoneContext } from "../context/Context";
import { IoMdArrowDropdown } from "react-icons/io";

function Phone() {
  const phoneInputRef = useRef(null);
  const [iti, setIti] = useState(null);
  const navigate = useNavigate();
  const { phoneData, setPhoneData } = usePhoneContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dialCode, setDialCode] = useState("");

  // Initialize intl-tel-input with using the CDN
  useEffect(() => {
    if (phoneInputRef.current) {
      const phoneInput = window.intlTelInput(phoneInputRef.current, {
        initialCountry: phoneData.countryCode,
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
      });
      setIti(phoneInput);

      // Set initial dial code
      setDialCode(phoneInput.getSelectedCountryData().dialCode);

      return () => {
        phoneInput.destroy();
      };
    }
  }, []);

  // Update country when the countryCode changes
  useEffect(() => {
    if (iti) {
      iti.setCountry(phoneData.countryCode);
      setDialCode(iti.getSelectedCountryData().dialCode);
    }
  }, [phoneData.countryCode, iti]);

  // Update phone number when the phoneNumber changes
  useEffect(() => {
    if (iti && phoneData.phoneNumber) {
      iti.setNumber(phoneData.phoneNumber);
    }
  }, [iti, phoneData.phoneNumber]);

  // Handle country selection change and adding the values to context
  const handleCountryChange = (code, name) => {
    setPhoneData((prev) => ({
      ...prev,
      countryCode: code,
      countryName: name,
      phoneNumber: "",
    }));
    setErrorMessage("");
    setIsDropdownOpen(false);
    
    if (iti) {
      iti.setCountry(code);
      setDialCode(iti.getSelectedCountryData().dialCode);
    }
  };

  // Handle phone number input change
  const handlePhoneChange = (e) => {
    setPhoneData((prev) => ({ ...prev, phoneNumber: e.target.value }));
    setErrorMessage("");
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Here filtering the custom country based on search
  const filteredCountries = contryCodeObj.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle form submission and render the view details page
  const handleSubmit = () => {
    if (iti && iti.isValidNumber()) {
      const fullNumber = iti.getNumber();
      setPhoneData((prev) => ({
        ...prev,
        phoneNumber: fullNumber,
      }));
      navigate("/viewDetails");
    } else {
      setErrorMessage("Please enter a valid phone number");
    }
  };

  return (
    <div className="flex justify-center items-center h-svh">
      <div className="w-80">
        {/* Searchable Country Dropdown */}
        <div className="relative">
          <div
            className="border p-3 rounded cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {phoneData.countryName || "Select Country"}
          </div>
          <div className="absolute right-2 top-4">
            <IoMdArrowDropdown size={20} />
          </div>
          {isDropdownOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg">
              <input
                type="text"
                placeholder="Search country"
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full p-2 border-b"
              />
              <div className="max-h-60 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleCountryChange(country.code, country.name)
                    }
                  >
                    {country.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Phone number input */}
        <div className="flex border-2 items-center p-3 mt-5">
          <label htmlFor="phone" className="mr-2">
            +{dialCode}
          </label>
          <input
            className="outline-none flex-grow"
            type="tel"
            id="phone"
            ref={phoneInputRef}
            onChange={handlePhoneChange}
            value={phoneData.phoneNumber}
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
        )}
        <div className="flex justify-center">
          <button onClick={handleSubmit} className="mt-5 p-3 border-2 w-full">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Phone;