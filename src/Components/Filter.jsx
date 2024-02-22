import React, { useState, useContext } from "react";
import { createContextProvider } from "../Context/Context";

function Filter() {
  const [activeCategory, setActiveCategory] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const { data } = useContext(createContextProvider); // Access flight data from context

  const [filteredData, setFilteredData] = useState(data); // State to hold filtered flight data

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
    filterData(color, minPrice);
  };

  const handleMinPriceChange = (event) => {
    const p = event.target.value;
    setMinPrice(p);
    filterData(selectedColor, p);
  };

  const filterData = (color, price) => {
    let newData = data;
    if (color) {
      newData = newData.filter((flight) => {
 
        return true; 
      });
    }
    if (price) {
      newData = newData.filter((flight) => {
   
        return true; 
      });
    }
    setFilteredData(newData);
  };

  const handleCheckbox = () => {
    setActiveCategory((prev) => !prev);
  };

  return (
    <div className="bg-base-100 shadow-lg  px-2 lg:px-8 py-5 h-screen overflow-y-auto">
      <h6 className="text-md lg:text-lg mb-6">Baggage</h6>

      <div className="flex flex-col justify-start">
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />2 pieces
        </li>
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />30 kg
        </li>
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />35 kg
        </li>
      </div>

      <div className="  mb-70 mt-10 border-y-2 py-8">
        <h6 className="text-md lg:text-lg mb-5">no of stops</h6>
        <div className="">
          <ul className="flex flex-col justify-start gap-2">
            <li>
              <input type="checkbox" name="nowarranty" id="" /> 1 stop flight
            </li>
            <li>
              <input type="checkbox" name="sellerwarranty" id="" />2 stop flight
            </li>
            <li>
              <input type="checkbox" name="brandwarranty" id="" /> Direct Flight
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mb-8 border-b-2 pb-8">
        <h6 className="text-md lg:text-lg mb-5">Flight Timings</h6>
        <div className="">
          <ul className="flex flex-row flex-wrap justify-start gap-2">
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" /> <span>Early Morning 3AM-7AM</span>
            </li>
            {/* Other timing checkboxes */}
          </ul>
        </div>
        {/* Repeat timings section if needed */}
      </div>

      <div className="container mx-auto">
        <h6 className="text-md lg:text-lg mb-5">Filter by Price</h6>

        {/* Price range slider */}
        <div className="mb-4 border-b-2 pb-8">
          <label className="block mb-1">
            Price Range: <span>{minPrice}</span>
          </label>
          <div className="flex items-center">
            <span className="font-medium text-2xl mr-2 ">+</span>
            <input
              type="range"
              min="0"
              max="100"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <span className="font-medium text-2xl ml-2">-</span>
          </div>
        </div>
      </div>

      <div className="">
        <h3>Airlines</h3>
        <ul className="flex flex-row flex-wrap justify-start gap-2">
          <li onClick={() => handleColorSelection(null)}>
            <input type="checkbox" className="mr-2" /> <span>Emirates</span>
          </li>
          {/* Other airlines checkboxes */}
        </ul>
      </div>
    </div>
  );
}

export default Filter;
