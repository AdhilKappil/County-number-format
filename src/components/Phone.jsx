import React, { useEffect, useRef, useState } from "react";

function Phone() {
  const phoneInputRef = useRef(null);
  useEffect(() => {
    if (phoneInputRef.current) {
      const phoneInput = intlTelInput(phoneInputRef.current, {
        utilsScript:
          "https://cdn.jsdelivr.net/npm/intl-tel-input@23.1.0/build/js/utils.js",
      });
    }
  }, []);
  return (
    <div>
      <div>
        <label htmlFor="phone">Phone</label>
        <input type="tel" id="phone" ref={phoneInputRef} />
      </div>
    </div>
  );
}

export default Phone;
