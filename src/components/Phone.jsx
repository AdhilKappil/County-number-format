import React, { useEffect, useRef, useState } from "react";
import { contryCodeObj } from "../data/countries";

function Phone() {
    const phoneInputRef = useRef(null);
    const [countyCode, setCountyCode] = useState("IN");
    const [iti, setIti] = useState(null);
    
  
    useEffect(() => {
      if (phoneInputRef.current) {
        const phoneInput = intlTelInput(phoneInputRef.current, {
          initialCountry: countyCode,
          utilsScript:
            "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
        });
        setIti(phoneInput);
  
        return () => {
          phoneInput.destroy();
        };
      }
    }, []);
  
    useEffect(() => {
      if (iti) {
        iti.setCountry(countyCode);
      }
    }, [countyCode, iti]);
  
    const handleCountryChange = (e) => {
      setCountyCode(e.target.value);
    };
  
    return (
      <div className="flex justify-center items-center h-svh">
        <div className="">
        <div className="relative flex overflow-hidden rounded-md border-2 transition">
          <select
            id="district"
            className="w-full p-3"
            value={countyCode}
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
        <div className="flex border-2 items-center p-3 mt-5">
          <label htmlFor="phone">Phone</label>
          <input className="outline-none" type="tel" id="phone" ref={phoneInputRef} />
        </div>
      <div className="flex justify-center">
        <button className="mt-5 p-3 border-2 w-36">Next</button>
      </div>
      </div>
      </div>
  );
}

export default Phone;
