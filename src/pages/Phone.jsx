import React, { useEffect, useRef, useState } from "react";
import { contryCodeObj } from "../data/countries";
import { useNavigate } from "react-router-dom";
import { usePhoneContext } from "../context/Context";

function Phone() {
  const phoneInputRef = useRef(null);
  const [iti, setIti] = useState(null);
  const navigate = useNavigate();
  const { phoneData, setPhoneData } = usePhoneContext();

   // Initialize intl-tel-input
  useEffect(() => {
    if (phoneInputRef.current) {
      const phoneInput = intlTelInput(phoneInputRef.current, {
        initialCountry: phoneData.countryCode,
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
      });
      setIti(phoneInput);
      return () => {
        phoneInput.destroy();
      };
    }
  }, []);

  // Update country when phoneData.countryCode changes
  useEffect(() => {
    if (iti) {
      iti.setCountry(phoneData.countryCode);
    }
  }, [phoneData.countryCode, iti]);

  // Update phone number when phoneData.phoneNumber changes
  useEffect(() => {
    if (iti && phoneData.phoneNumber) {
      iti.setNumber(phoneData.phoneNumber);
    }
  }, [iti, phoneData.phoneNumber]);

  // Handle country selection change
  const handleCountryChange = (e) => {
    setPhoneData((prev) => ({ ...prev, countryCode: e.target.value }));
  };

   // Handle phone number input change
  const handlePhoneChange = (e) => {
    setPhoneData((prev) => ({ ...prev, phoneNumber: e.target.value }));
  };

  // Handle form submission
  const handle = () => {
    if (iti && iti.isValidNumber()) {
      const fullNumber = iti.getNumber();
      const countryName =
        contryCodeObj.find((country) => country.code === phoneData.countryCode)
          ?.name || "";
      setPhoneData((prev) => ({
        ...prev,
        phoneNumber: fullNumber,
        countryName,
      }));
      navigate("/viewDetails");
    } else {
      alert("Please enter a valid phone number");
    }
  };

  return (
    <div className="flex justify-center items-center h-svh">
      <div className="">
         {/* Country selection dropdown */}
        <div className="relative flex overflow-hidden rounded-md border-2 transition">
          <select
            id="district"
            className="w-full p-3"
            value={phoneData.countryCode}
            onChange={handleCountryChange}
          >
            <option value="">Select</option>
            {contryCodeObj.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
         {/* Phone number input */}
        <div className="flex border-2 items-center p-3 mt-5">
          <label htmlFor="phone">Phone</label>
          <input
            className="outline-none"
            type="tel"
            id="phone"
            ref={phoneInputRef}
            onChange={handlePhoneChange}
            value={phoneData.phoneNumber}
          />
        </div>
        <div className="flex justify-center">
          <button onClick={handle} className="mt-5 p-3 border-2 w-36">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Phone;
