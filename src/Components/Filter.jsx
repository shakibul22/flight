import React, { useState, useContext } from "react";
import { createContextProvider } from "../Context/Context";

function Filter() {
  const {
    setSelectedBaggages,
    selectedAirlines,
    setSelectedAirlines,
    priceFilter,
    setPriceFilter,
    setStop,
    setSelectedTimingSlots,
  } = useContext(createContextProvider);

 
  const handleTimingSlotChange = (event) => {
    const value = event.target.value;

    setSelectedTimingSlots(value);
  };

  const handlePriceFilterChange = (event) => {
    setPriceFilter(event.target.value);
  };
  const handleBaggageSelection = (baggageOption) => {
    setSelectedBaggages(baggageOption);
  };
  const handleStopSelection = (stoppage) => {
    setStop(stoppage);
  };

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
            onChange={() => handleBaggageSelection("20 kg")}
          />
          20 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("25 kg")}
          />
          25 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("30 kg")}
          />
          30 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("35 kg")}
          />
          35 Kg
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            onChange={() => handleBaggageSelection("40 kg")}
          />
          40 Kg
        </label>
      </div>

      <div className="mb-70 mt-10 border-y-2 py-8">
        <h6 className="text-md lg:text-lg mb-5">No of Stops</h6>
        <div className="">
          <ul className="flex flex-col justify-start gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => handleStopSelection("1 Stop Flight")}
              />
              1 Stop Flight
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => handleStopSelection("2 Stop Flight")}
              />
              2 Stop Flight
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onChange={() => handleStopSelection("Direct Flight")}
              />
              Direct Flight
            </label>
          </ul>
        </div>
      </div>

      <div className="container mx-auto mb-8 border-b-2 pb-8">
        <h6 className="text-md lg:text-lg mb-5">Flight Timings</h6>
        <div>
          <ul className="flex flex-row flex-wrap justify-start gap-2">
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="early-morning"
                onChange={handleTimingSlotChange}
              />
              <span>Early Morning 3AM-7AM</span>
            </li>
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="morning"
                onChange={handleTimingSlotChange}
              />
              <span>Morning 7AM-12PM</span>
            </li>
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="afternoon"
                onChange={handleTimingSlotChange}
              />
              <span>Afternoon 12PM-4PM</span>
            </li>
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="evening"
                onChange={handleTimingSlotChange}
              />
              <span>Evening 4PM-9PM</span>
            </li>
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="night"
                onChange={handleTimingSlotChange}
              />
              <span>Night 9PM-12AM</span>
            </li>
            <li>
              <input
                type="checkbox"
                className="mr-2"
                value="mid-night"
                onChange={handleTimingSlotChange}
              />
              <span>Mid-Night 12AM-3AM</span>
            </li>
          </ul>
        </div>

        <div className="container mx-auto">
          <h6 className="text-md lg:text-lg mb-5">Filter by Price</h6>
          {/* Price range filter */}
          <div className="mb-4 border-b-2 pb-8">
            <label className="block mb-1">Price Range:</label>
            <input
              type="range"
              min="0"
              max="100000"
              step="1"
              value={priceFilter}
              onChange={handlePriceFilterChange}
            />
            <div>Max Price: ${priceFilter}</div>
          </div>
        </div>
        <div className="container mx-auto">
          <h6 className="text-md lg:text-lg mb-5">Filter by Airlines</h6>

          <div className="">
            <ul className="flex flex-col justify-start gap-2">
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
  );
}

export default Filter;
