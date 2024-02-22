import React, { useState, useEffect, useRef, useContext } from "react";
import { MdClose } from "react-icons/md";
import { getAllAirports } from "../Actions/airport";
import { GiCommercialAirplane } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import { createContextProvider } from "../Context/Context";
const ToInputModal = ({ inputValue, setInputValue }) => {
  const [modal, setModal] = useState(false);
  const [showCloseIcon, setShowCloseIcon] = useState(false);
  const [airport, setAirport] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const { setSelectedCityCode1 } = useContext(createContextProvider);
  const modalRef = useRef(null);
  useEffect(() => {
    async function fetchAirports() {
      try {
        const res = await getAllAirports();
        setAirport(res);
      } catch (error) {
        console.error("Error fetching airport data:", error);
      }
    }
    fetchAirports();
  }, []);

  useEffect(() => {
    if (inputValue.trim() !== "") {
      const filtered = airport.filter((item) =>
        item.search_contents.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredAirports(filtered);
    } else {
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
    setInputValue("");
    setShowCloseIcon(false);
  };

  const handleFocus = () => {
    setModal(true);
    setShowCloseIcon(inputValue.trim().length > 0);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setShowCloseIcon(value.trim().length > 0);
  };

  const handleKeyDown = (e) => {
    if (e.key !== "Backspace") {
      setShowCloseIcon(true);
    }
  };

  const handleSelectAirport = (selectedAirport) => {
    setInputValue(selectedAirport.airport_name);
    setSelectedCityCode1(selectedAirport.city_code);
    setModal(false);
    setFilteredAirports([]);
  };

  const handleSelectPopularCity = (cityName) => {
    setInputValue(cityName);

    const cityCode = cityName.toLowerCase().substring(0, 3);
    setSelectedCityCode1(cityCode);
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
                : "w-[25vh] z-0"
            }`}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown} // Listen for keyboard input
          />
          {modal && showCloseIcon && (
            <MdClose
              className="transform translate-x-48 z-50 text-2xl bg-slate-300 rounded-full overflow-hidden absolute cursor-pointer"
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
                      {airport.city_name} ,{airport.country_name}
                    </span>
                    <span>{generateShortForm(airport.city_code)}</span>
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
                  <p onClick={() => handleSelectPopularCity("Jeddah")}>
                    Jeddah
                  </p>
                  <p onClick={() => handleSelectPopularCity("Riyadh")}>
                    Riyadh
                  </p>
                  <p onClick={() => handleSelectPopularCity("Dammam")}>
                    Dammam
                  </p>
                  <p onClick={() => handleSelectPopularCity("Muscat")}>
                    Muscat
                  </p>
                  <p onClick={() => handleSelectPopularCity("Al Madinah")}>
                    Al Madinah
                  </p>
                  <p onClick={() => handleSelectPopularCity("Kuwait City")}>
                    Kuwait City
                  </p>
                  <p onClick={() => handleSelectPopularCity("Doha")}>Doha</p>
                  <p onClick={() => handleSelectPopularCity("Abu Dhabi")}>
                    Abu Dhabi
                  </p>
                  <p onClick={() => handleSelectPopularCity("Sharjah")}>
                    Sharjah
                  </p>
                  <p onClick={() => handleSelectPopularCity("Bangkok")}>
                    Bangkok
                  </p>
                  <p onClick={() => handleSelectPopularCity("Manama")}>
                    Manama
                  </p>
                  <p onClick={() => handleSelectPopularCity("Kolkata")}>
                    Kolkata
                  </p>
                  <p onClick={() => handleSelectPopularCity("Tabuk")}>Tabuk</p>
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
