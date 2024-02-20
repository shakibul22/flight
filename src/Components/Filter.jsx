import React, { useState } from "react";

function Filter() {
  const [activeCategory, setActiveCategory] = useState(false);

  const [selectedColor, setSelectedColor] = useState(null);
  const [minPrice, setMinPrice] = useState("");

  // console.log(minPrice)

  // Function to handle color selection
  const handleColorSelection = (color) => {
    setSelectedColor(color);
  };

  const handleCheckbox = () => {
    setActiveCategory((prev) => !prev);
  };

  // Function to handle minimum price input
  const handleMinPriceChange = (event) => {
    const p = event.target.value;
    setMinPrice(p);
  };
  return (
    <div className="bg-base-100 shadow-lg  px-2 lg:px-8 py-5 h-screen overflow-y-auto">
      <h6 className="text-md lg:text-lg mb-6">Baggage</h6>

      <div className="flex flex-col justify-start">
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />2
          pieces
        </li>
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />
          30 kg
        </li>
        <li className="flex flex-row gap-2 justify-start items-center w-[25vh]">
          <input type="checkbox" name="" onClick={handleCheckbox} id="" />2 35
          kg
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
              <input type="checkbox" name="brandwarranty" id="" />
              Direct Flight
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mb-8 border-b-2 pb-8">
        <h6 className="text-md lg:text-lg mb-5">Flight Timings</h6>
        <div className="">
          <ul className="flex flex-row flex-wrap justify-start gap-2">
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span>Early Morning 3AM-7AM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Morning 7AM-12PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Afternoon 12PM-4PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Evening 4PM-9PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Night 9PM-12AM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Mid-Night 12AM-3AM</span>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-row flex-wrap justify-start gap-2">
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span>Early Morning 3AM-7AM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Morning 7AM-12PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Afternoon 12PM-4PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Evening 4PM-9PM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Night 9PM-12AM</span>
            </li>
            <li onClick={() => handleColorSelection(null)}>
              <input type="checkbox" className="mr-2" />
              <span> Mid-Night 12AM-3AM</span>
            </li>
          </ul>
        </div>
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
            <input type="checkbox" className="mr-2" />
            <span>Emirates</span>
          </li>
          <li onClick={() => handleColorSelection(null)}>
            <input type="checkbox" className="mr-2" />
            <span>Fly Dubai</span>
          </li>
          <li onClick={() => handleColorSelection(null)}>
            <input type="checkbox" className="mr-2" />
            <span>Qatar Airways</span>
          </li>
          <li onClick={() => handleColorSelection(null)}>
            <input type="checkbox" className="mr-2" />
            <span>Turkish Airlines</span>
          </li>
          <li onClick={() => handleColorSelection(null)}>
            <input type="checkbox" className="mr-2" />
            <span>Flynus</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
