import { createContext, useState } from "react";

export const createContextProvider = createContext(null);
const Context = ({ children }) => {
  const [selectedCityCode, setSelectedCityCode] = useState("");
  const [selectedCityCode1, setSelectedCityCode1] = useState("");
  const info = {
    selectedCityCode,
    selectedCityCode1,
    setSelectedCityCode1,
    setSelectedCityCode,
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
