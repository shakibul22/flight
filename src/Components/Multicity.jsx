import React, { useState } from "react";
import InputModal from "./InputModal"; // Assuming InputModal is a component defined elsewhere
import ToInputModal from "./ToInputModal"; // Assuming ToInputModal is a component defined elsewhere
// Assuming DatePicker is a component defined elsewhere
import { MdSwapHoriz } from "react-icons/md"; // Assuming MdSwapHoriz is imported from react-icons library
import Deparature from "./Deparature";

const Multicity = () => {
  const [cities, setCities] = useState([
    { input1: "", input2: "" },
    { input1: "", input2: "" },
  ]);

  const addFlight = () => {
    setCities([...cities, { input1: "", input2: "" }]);
  };

  const removeFlight = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const handleSwap = (index) => {
    const newCities = [...cities];
    const temp = newCities[index].input1;
    newCities[index].input1 = newCities[index].input2;
    newCities[index].input2 = temp;
    setCities(newCities);
  };

  const handleInputChange = (index, inputType, value) => {
    const newCities = [...cities];
    newCities[index][inputType] = value;
    setCities(newCities);
  };

  return (
    <div className=" w-[76vh]">
      {cities.map((city, index) => (
        <div className="multicity flex justify-start  items-center" key={index}>
          <div className="w-full relative mr-1">
            <InputModal
              inputValue={city.input1}
              setInputValue={(value) =>
                handleInputChange(index, "input1", value)
              }
            />
          </div>
          <button
            onClick={() => handleSwap(index)}
            className={`z-10 absolute transform  translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[194px] mt-2   overflow-auto rounded-full border-white border-4 ${
              city.input1 && city.input2 ? "bg-green-400" : "bg-gray-200 "
            }`}
            disabled={!city.input1 || !city.input2}
          >
            <MdSwapHoriz className="text-xs border-2  ring text-gray-950 w-10 h-10" />{" "}
          </button>
          {/* Arrow button */}
          <div className="w-full relative">
            <ToInputModal
              inputValue={city.input2}
              setInputValue={(value) =>
                handleInputChange(index, "input2", value)
              }
            />
          </div>
          <div className="w-full">
            <Deparature />
          </div>
          {cities.length > 2 && (
            <button
              type="button"
              className="btn btn-circle"
              onClick={() => removeFlight(index)}
            >
              X
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="transform translate-x-64 absolute top-12 bg-green-400 px-3 py-2 border-2 rounded-md  right-[30%]"
        onClick={addFlight}
      >
        + Add Flight
      </button>
    </div>
  );
};

export default Multicity;
