import React, { useContext, useEffect, useRef, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { GiCommercialAirplane } from "react-icons/gi";
import { MdClose } from "react-icons/md";
import { getAllAirports } from "../Actions/airport";
import { createContextProvider } from "../Context/Context";
// import { useDispatch } from "react-redux";

const InputModal = ({ inputValue, setInputValue }) => {
  const [modal, setModal] = useState(false);
  const [airport, setAirport] = useState([]);
  const [filteredAirports, setFilteredAirports] = useState([]);
  const { setSelectedCityCode } = useContext(createContextProvider);
  const modalRef = useRef(null);
  // const dispatch = useDispatch();

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
    // Filter airports based on input value
    if (inputValue.trim() !== "") {
      const filtered = airport.filter((item) =>
        item.search_contents.toLowerCase().includes(inputValue.toLowerCase())
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
    setInputValue("");
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
      setModal(true);
    }
  };
  const handleSelectAirport = (selectedAirport) => {
    if (selectedAirport) {
      setInputValue(selectedAirport.airport_name);
      setSelectedCityCode(selectedAirport.city_code);
      setModal(false);
      setFilteredAirports([]);
      // dispatch({
      //   type: "INPUTMODAL",
      //   payload: selectedAirport.city_code,
      // });
    } else {
      setInputValue("");
    }
  };

  const handleSelectPopularCity = (city) => {
    setInputValue(city);

    const cityCode = city.toLowerCase().substring(0, 3);
    setSelectedCityCode(cityCode);
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
      className={`duration-200 absolute -mt-6 rounded-lg border-2   ${
        modal ? "w-[350px] z-30 bg-white " : "w-full md:w-[190px] lg:w-[212px]"
      }`}
    >
      <div className={`${modal ? "w-full z-[50]" : "static"}`} ref={modalRef}>
        <div className="flex justify-between items-center relative">
          <input
            type="text"
            placeholder="From"
            className={`rounded-sm    h-14  pl-3  lg:w-full duration-200 ${
              modal ? "w-full z-20 pl-1  border-[#e7fddc]" : " z-0"
            }`}
            value={inputValue}
            onChange={handleChange}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
          />
          {modal && inputValue && (
            <MdClose
              className="transform translate-x-32 lg:translate-x-72 z-50 text-2xl bg-slate-300 rounded-full overflow-hidden absolute cursor-pointer"
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
                  className="cursor-pointer grid grid-cols-2 items-center w-[55vh] justify-between gap-5"
                >
                  <div className="border-b-2 flex flex-row justify-between text-[#50b412]  hover:bg-[#e7fddc]  ">
                    <span className="flex flex-row  items-center gap-2">
                      {airport.airport_name
                        .toLowerCase()
                        .includes("airport") ? (
                        <GiCommercialAirplane className="text-3xl text-[#50b412] font-bold" />
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
