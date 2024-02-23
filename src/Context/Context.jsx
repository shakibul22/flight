import { createContext, useState } from "react";

export const createContextProvider = createContext(null);

const Context = ({ children }) => {
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [selectedCityCode1, setSelectedCityCode1] = useState("");
  const [data, setData] = useState([]); // Initialize the data state here
  const [departurePlaceholder, setDeparturePlaceholder] = useState("Departure");
  const [returnPlaceholder, setReturnPlaceholder] = useState("Return");
  const [travelClass, setTravelClass] = useState("Economy"); // Default value is 'Economy'

  const info = {
    selectedCityCode,
    selectedCityCode1,
    setSelectedCityCode1,
    setSelectedCityCode,
    setData,departurePlaceholder, setDeparturePlaceholder,
    data ,returnPlaceholder, setReturnPlaceholder,travelClass, setTravelClass
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
