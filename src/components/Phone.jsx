import React, { useEffect, useRef, useState } from "react";
import { contryCode } from "../data/countries";

function Phone() {
    const phoneInputRef = useRef(null);
    const [code, setCode] = useState("IN");
    const [iti, setIti] = useState(null);
    
  
    useEffect(() => {
      if (phoneInputRef.current) {
        const phoneInput = intlTelInput(phoneInputRef.current, {
          initialCountry: code,
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
        iti.setCountry(code);
      }
    }, [code, iti]);
  
    const handleCountryChange = (e) => {
      setCode(e.target.value);
    };
  
    return (
      <div className="flex m-10 gap-10">
        <div>
          <select
            id="district"
            className="w-full rounded-lg border py-2 px-3"
            value={code}
            onChange={handleCountryChange}
          >
            <option value="">Select</option>
            {contryCode.map((country, index) => (
              <option key={index} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="tel" id="phone" ref={phoneInputRef} />
        </div>
      </div>
  );
}

export default Phone;
