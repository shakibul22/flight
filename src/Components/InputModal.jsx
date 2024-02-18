import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { getAllAirports } from "../Actions/airport";
import { FaLocationDot } from "react-icons/fa6";
import { GiCommercialAirplane } from "react-icons/gi";

const InputModal = ({ inputValue, setInputValue }) => {
  const [modal, setModal] = useState(false);
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
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Backspace") {
      // Show modal when user inputs something from the keyboard
      setModal(true);
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

  // Function to generate short form for airport name within 3 characters
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
            placeholder="From"
            className={`border-2 h-14 p-4 pl-8 w-[200px] lg:w-full duration-200 ${
              modal
                ? "w-full z-20 pl-3 border-4 border-[#e7fddc]"
                : "w-[27wh] z-0"
            }`}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown} // Listen for keyboard input
          />
       {modal && inputValue && (
  <MdClose
    className="transform translate-x-32 lg:translate-x-48 z-50 text-2xl bg-slate-300 rounded-full overflow-hidden absolute cursor-pointer"
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
              {filteredAirports.slice(0, 10).map((airport) => (
                <div
                  key={airport.code}
                  onClick={() => handleSelectAirport(airport)}
                  className="cursor-pointer grid grid-cols-2 items-center w-[55vh] justify-between gap-5"
                >
                  <div className="border-b-2 flex flex-row justify-between gap-6 hover:bg-[#e7fddc] p-2 ">
                    <span className="flex flex-row items-center gap-2">
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
                <h3 className="font-medium mb-4">Popular Cities</h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 justify-evenly gap-3">
                  {/* Sample popular cities */}
                  <p onClick={() => handleSelectPopularCity("Dhaka")}>Dhaka</p>
                  <p onClick={() => handleSelectPopularCity("Chittagong")}>
                    Chittagong
                  </p>
                  <p onClick={() => handleSelectPopularCity("Sylhet")}>
                    Sylhet
                  </p>
                  <p onClick={() => handleSelectPopularCity("Rajshahi")}>
                    Rajshahi
                  </p>
                  <p onClick={() => handleSelectPopularCity("Cox's Bazar")}>
                    Cox's Bazar
                  </p>
                  <p onClick={() => handleSelectPopularCity("Jessore")}>
                    Jessore
                  </p>
                  <p onClick={() => handleSelectPopularCity("Barisal")}>
                    Barisal
                  </p>
                  <p onClick={() => handleSelectPopularCity("Pabna")}>Pabna</p>
                  <p onClick={() => handleSelectPopularCity("Saidpur")}>
                    Saidpur
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
