import React, { useState, useEffect } from "react";
import { MdClose, MdLocalAirport } from "react-icons/md";
import { getAllAirports } from "../Actions/airport";

const InputModal = ({ inputValue, setInputValue }) => {
  const [modal, setModal] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [airport, setAirport] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);

  useEffect(() => {
    // Fetch airport data when the component mounts
    async function fetchAirports() {
      try {
        const res = await getAllAirports();
        setAirport(res);
      } catch (error) {
        console.error("Error fetching airport data:", error);
      }
    }
    fetchAirports();
  }, []); // Empty dependency array to ensure useEffect runs only once

  useEffect(() => {
    // Filter airports based on input value
    if (inputValue.trim() !== "") {
      const filtered = airport.filter((item) =>
        item.airport_name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
      // If input value is empty, show popular cities
      setFilteredAirports([]);
    }
  }, [inputValue, airport]);

  const handleClearInput = () => {
    setInputValue(""); // Clear the input by setting it to an empty string
  };

  const handleFocus = () => {
    setModal(true);
    setShowCloseIcon(inputValue.trim().length > 0); // Show close icon if input has value
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowCloseIcon(value.trim().length > 0); // Show close icon if input has value
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Backspace") {
      // Show close icon when user inputs something from the keyboard
      setShowCloseIcon(true);
    }
  };

  const handleSelectAirport = (selectedAirport) => {
    if (selectedAirport) {
      setInputValue(selectedAirport.airport_name);
      setModal(false);
      setFilteredAirports([]); // Clear filtered airports
    } else {
      setInputValue(""); // Clear input value
    }
  };

  const handleSelectPopularCity = (city) => {
    setInputValue(city);
    setModal(false);
    setFilteredAirports([]);
  };

  return (
    <div
      className={`duration-200 absolute -mt-6 ${
        modal ? "w-[350px] z-30 bg-white border" : ""
      }`}
    >
      <div className={`${modal ? "w-full z-[50]" : "static"}`}>
        <div className="flex justify-between items-center relative">
          <input
            type="text"
            placeholder="From"
            className={`border-2 h-14 p-4 pl-8 duration-200 ${
              modal
                ? "w-full z-20 pl-3 border-4 border-[#e7fddc]"
                : "w-[27wh] z-0"
            }`}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown} // Listen for keyboard input
          />
          {showCloseIcon && (
            <MdClose
              className="transform translate-x-48 z-50 overflow-hidden absolute cursor-pointer"
              onClick={handleClearInput}
            />
          )}
        </div>
        <div
          className={`duration-200 ${
            modal ? "block w-full p-5 bg-white text-black z-50" : "w-0 hidden"
          }`}
        >
          <div>
            {/* Render filtered airports */}
            <div>
              {filteredAirports.map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleSelectAirport(airport)}
                  className="cursor-pointer grid  grid-cols-2 items-center w-[55vh] justify-between gap-5"
                >
                  <div className="border-b-2 flex flex-row justify-between ">
                    <span className="flex flex-row  items-center gap-2">
                      <MdLocalAirport /> {airport.airport_name} -
                      {airport.country_name}{" "}
                    </span>
                    <span>{airport.code}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Show popular cities if filteredAirports is empty */}
            {filteredAirports.length === 0 && (
              <div>
                <h3>Popular Cities</h3>
                <div className="flex flex-row flex-wrap justify-evenly gap-3">
                  {/* Sample popular cities */}
                  <p onClick={() => handleSelectPopularCity("Bangladesh")}>
                    Dubai
                  </p>
                  <p onClick={() => handleSelectPopularCity("Sylhet")}>
                    New York
                  </p>
                  <p onClick={() => handleSelectPopularCity("India")}>London</p>
                  <p onClick={() => handleSelectPopularCity("Srilanka")}>
                    Paris
                  </p>
                  <p onClick={() => handleSelectPopularCity("Tokyo")}>Tokyo</p>
                  <p onClick={() => handleSelectPopularCity("Singapore")}>
                    Singapore
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
