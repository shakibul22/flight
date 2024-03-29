import { createContext, useState } from "react";

export const createContextProvider = createContext(null);

const Context = ({ children }) => {
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [selectedCityCode1, setSelectedCityCode1] = useState("");
  const [data, setData] = useState([]); // Initialize the data state here
  const [departurePlaceholder, setDeparturePlaceholder] = useState("Departure");
  const [returnPlaceholder, setReturnPlaceholder] = useState("Return");
  const [travelClass, setTravelClass] = useState("Economy"); // Default value is 'Economy'
  const [selectedBaggages, setSelectedBaggages] = useState(null); 
  const [selectedAirlines, setSelectedAirlines] = useState({});
  const [priceFilter, setPriceFilter] = useState(""); 
  const [stop, setStop] = useState(""); 
  const [selectedTimingSlots, setSelectedTimingSlots] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Any Flight");

  const info = {
    selectedCityCode,selectedTimingSlots, setSelectedTimingSlots,
    selectedCityCode1,
    setSelectedCityCode1,
    setSelectedCityCode,selectedOption, setSelectedOption,
    setData,departurePlaceholder, setDeparturePlaceholder,
    data ,returnPlaceholder, setReturnPlaceholder,travelClass, setTravelClass,selectedBaggages, setSelectedBaggages,selectedAirlines, setSelectedAirlines,priceFilter, setPriceFilter,stop, setStop
  };

  return (
    <div>
      <createContextProvider.Provider value={info}>
        {children}
      </createContextProvider.Provider>
    </div>
  );
};

export default Context;
