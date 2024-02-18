import React, { useState, useEffect, useRef } from "react";
import { MdClose, MdLocalAirport } from "react-icons/md";
import { getAllAirports } from "../Actions/airport";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";

const ToInputModal = ({ inputValue, setInputValue }) => {
  const [modal, setModal] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [airport, setAirport] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const modalRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
    setInputValue(selectedAirport.airport_name);
    setModal(false);
    setFilteredAirports([]);
  };

  const handleSelectPopularCity = (cityName) => {
    setInputValue(cityName);
    setModal(false);
    setFilteredAirports([]);
  };
  function generateShortForm(airportName) {
    const words = airportName.split(" ");
    let shortForm = "";
    for (let i = 0; i < words.length; i++) {
      if (shortForm.length < 3) {
        shortForm += words[i].substring(
          0,
          Math.min(3 - shortForm.length, words[i].length)
        );
      } else {
        break;
      }
    }
    return shortForm.toUpperCase();
  }

  return (
    <div
      className={`duration-200 absolute -mt-6 ${
        modal ? "w-[350px] z-30 bg-white border" : ""
      }`}
    >
      <div className={`${modal ? "w-full z-[50]" : "static"}`} ref={modalRef}>
        <div className="flex justify-between items-center relative">
          <input
            type="text"
            placeholder="To"
            className={`border-2 h-14 p-4 pl-8 w-[170px] lg:w-full duration-200 ${
              modal
                ? "w-full z-20 pl-3 border-4 border-[#e7fddc]"
                : "w-[25wh] z-0"
            }`}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown} // Listen for keyboard input
          />
          {showCloseIcon && (
            <MdClose
              className="transform translate-x-48 z-50  text-2xl bg-slate-300 rounded-full overflow-hidden absolute cursor-pointer"
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
            <div>
              {filteredAirports.slice(0, 10).map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleSelectAirport(airport)}
                  className="cursor-pointer grid  grid-cols-2 items-center w-[55vh] justify-between gap-5"
                >
                  <div className="border-b-2 flex flex-row justify-between gap-6 hover:bg-[#e7fddc] p-2 ">
                    <span className="flex flex-row  items-center gap-2">
                      {airport.airport_name
                        .toLowerCase()
                        .includes("airport") ? (
                        <GiCommercialAirplane className="text-3xl font-bold" />
                      ) : (
                        <FaLocationDot className="text-2xl font-bold" />
                      )}
                      {airport.airport_name} - {airport.country_name}
                    </span>
                    <span>{generateShortForm(airport.airport_name)}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Show popular cities if filteredAirports is empty */}
            {filteredAirports.length === 0 && (
              <div>
                <h3 className="font-medium">Popular Cities</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 justify-evenly gap-3">
                  {/* Sample popular cities */}
                  <p onClick={() => handleSelectPopularCity("Dubai")}>Dubai</p>
                  <p onClick={() => handleSelectPopularCity("New York")}>
                    New York
                  </p>
                  <p onClick={() => handleSelectPopularCity("London")}>
                    London
                  </p>
                  <p onClick={() => handleSelectPopularCity("Paris")}>Paris</p>
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

export default ToInputModal;
