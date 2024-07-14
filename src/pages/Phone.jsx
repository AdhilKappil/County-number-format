import React, { useEffect, useState } from "react";
import { countryCodeObj } from "../data/countries";
import CustomDropdown from "../components/CustomDropDown";
import { usePhoneContext } from "../context/Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Phone() {
  const { phoneData, setPhoneData } = usePhoneContext();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    if (!phoneData.countryName) {
      const defaultCountry = countryCodeObj.find((c) => c.name === "India");
      setPhoneData({
        countryCode: defaultCountry.dialCode,
        phoneNumber: "",
        countryName: defaultCountry.name,
      });
    }
  }, []);

  const handleCountrySelect = (country) => {
    setPhoneData((prevData) => ({
      ...prevData,
      countryCode: country.dialCode,
      countryName: country.name,
      phoneNumber: "",
    }));
    setError("");
  };

  const handleDialCodeSelect = (country) => {
    setPhoneData((prevData) => ({
      ...prevData,
      countryCode: country.dialCode,
      phoneNumber: "",
    }));
    setError("");
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.target.value;
    setPhoneData((prevData) => ({
      ...prevData,
      phoneNumber: input,
    }));
    validatePhoneNumber(input);
  };

  const validatePhoneNumber = (input) => {
    const country = countryCodeObj.find(
      (c) => c.dialCode === phoneData.countryCode
    );
    if (!country) {
      setError("Invalid country code");
      return;
    }

    const sampleNumberDigits = country.sampleNumber.replace(/\D/g, "");
    const inputDigits = input.replace(/\D/g, "");

    if (inputDigits.length !== sampleNumberDigits.length) {
      setError(`Please enter a valid ${country.name} phone number`);
    } else {
      setError("");
    }
  };

  const getPlaceholder = () => {
    const country = countryCodeObj.find(
      (c) => c.dialCode === phoneData.countryCode
    );
    return country ? country.sampleNumber : "";
  };

  const handleNextClick = () => {
    if (error) {
      toast.error("Please enter a valid phone number before proceeding.")

    } else if(!phoneData.phoneNumber){
      setError(`Please enter a valid phone number`);
    }else{
      navigate("/viewDetails");
    } 
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full p-5 md:w-3/4 lg:w-2/5">
        <div className="flex flex-col pt-4">
          <CustomDropdown
            options={countryCodeObj}
            selectedValue={countryCodeObj.find(
              (c) => c.name === phoneData.countryName
            )}
            onSelect={handleCountrySelect}
            displayKey="name"
            placeholder="Select Country"
            showOnlyDisplayKey={true}
          />
        </div>
        <div className="flex gap-5 my-5">
          <div className="flex-1">
            <CustomDropdown
              options={countryCodeObj}
              selectedValue={countryCodeObj.find(
                (c) => c.dialCode === phoneData.countryCode
              )}
              onSelect={handleDialCodeSelect}
              displayKey="dialCode"
              valueKey="name"
              placeholder="Dial Code"
              showCountryName={true}
            />
          </div>
          <div className="rounded border-2 w-3/5 p-3">
            <input
              className="w-full border-gray-300 bg-white focus:outline-none focus:ring-0"
              placeholder={getPlaceholder()}
              value={phoneData.phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
        <div className="flex justify-center">
          <button className="border-2 w-full p-3" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Phone;
