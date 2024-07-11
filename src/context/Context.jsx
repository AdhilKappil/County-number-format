import React, { createContext, useState, useContext } from 'react';

const PhoneContext = createContext();

export const PhoneProvider = ({ children }) => {
  const [phoneData, setPhoneData] = useState({
    countryCode: 'IN',
    phoneNumber: '',
    countryName: 'India'
  });

  return (
    <PhoneContext.Provider value={{ phoneData, setPhoneData }}>
      {children}
    </PhoneContext.Provider>
  );
};

export const usePhoneContext = () => useContext(PhoneContext);