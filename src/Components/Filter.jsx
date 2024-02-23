import React, { useState, useContext } from "react";
import { createContextProvider } from "../Context/Context";

function Filter() {
  const {setSelectedBaggages, selectedAirlines, setSelectedAirlines,priceFilter, setPriceFilter } =
    useContext(createContextProvider);
   

  

  
  
    // Function to handle price filter change
    const handlePriceFilterChange = (event) => {
      setPriceFilter(event.target.value);
    };
  const handleBaggageSelection = (baggageOption) => {
    setSelectedBaggages(baggageOption);
  };

  // Function to handle airline selection
  const handleAirlineSelection = (airline) => {
    setSelectedAirlines({
      ...selectedAirlines,
      [airline]: !selectedAirlines[airline],
    });
  };

  return (
    <div className="bg-base-100 shadow-lg  px-2 lg:px-8 py-5 h-screen overflow-y-auto">
      <h6 className="text-md lg:text-lg mb-6">Baggage</h6>
      <div className="flex flex-col justify-start">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("1 pieces")}
          />
          1 pieces
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("2 pieces")}
          />
          2 pieces
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("20 Kg")}
          />
          20 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("25 Kg")}
          />
          25 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("30 Kg")}
          />
          30 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("35 Kg")}
          />
          35 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("40 Kg")}
          />
          40 Kg
        </label>
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
            <li>
              <input type="checkbox" className="mr-2" />
              <span>Early Morning 3AM-7AM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Morning 7AM-12PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Afternoon 12PM-4PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Evening 4PM-9PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Night 9PM-12AM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Mid-Night 12AM-3AM</span>
            </li>
          </ul>
        </div>
        <div className="">
          <ul className="flex flex-row flex-wrap justify-start gap-2">
            <li>
              <input type="checkbox" className="mr-2" />
              <span>Early Morning 3AM-7AM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Morning 7AM-12PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Afternoon 12PM-4PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Evening 4PM-9PM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Night 9PM-12AM</span>
            </li>
            <li>
              <input type="checkbox" className="mr-2" />
              <span> Mid-Night 12AM-3AM</span>
            </li>
          </ul>
        </div>
        <div className="container mx-auto">
          <h6 className="text-md lg:text-lg mb-5">Filter by Price</h6>
          {/* Price range filter */}
          <div className="mb-4 border-b-2 pb-8">
            <label className="block mb-1">Price Range:</label>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter max price"
              value={priceFilter}
              onChange={handlePriceFilterChange}
            />
          </div>
        </div>
        <div className="container mx-auto">
          <h6 className="text-md lg:text-lg mb-5">Filter by Airlines</h6>
          <div className="mb-4 border-b-2 pb-8">
            <div className="">
              <h3>Airlines</h3>
              <ul className="flex flex-row flex-wrap justify-start gap-2">
                {/* Render checkboxes for each airline option */}
                {[
                  "Emirates",
                  "Fly Dubai",
                  "Qatar Airways",
                  "Turkish Airlines",
                  "Flynus",
                ].map((airline, index) => (
                  <li key={index}>
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedAirlines[airline]}
                      onChange={() => handleAirlineSelection(airline)}
                    />
                    <span>{airline}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
