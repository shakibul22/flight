import FlightTab from "./FlightTab";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { useState } from "react";

const SearchFormTab = () => {
  const [activeTab, setActiveTab] = useState("flights");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={`tab font-semibold text-lg border-2 ${
            activeTab === "flights"
              ? "bg-white text-black"
              : "bg-[#9da08e] text-white"
          }`}
          aria-label="Flights"
          checked={activeTab === "flights"}
          onChange={() => handleTabChange("flights")}
        />
        <div
          role="tabpanel"
          className="tab-content shadow-xl bg-white border-base-100 rounded-box p-6"
        >
          <span>
            <FlightTab />
          </span>
        </div>
        {/* Second Tab */}
        <div className="w-2 "></div> {/* Gap between tabs */}
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className={`tab font-semibold text-lg border-2 ${
            activeTab === "hotels"
              ? "bg-white text-black "
              : "bg-[#9da08e] text-white"
          }`}
          aria-label="Hotels"
          checked={activeTab === "hotels"}
          onChange={() => handleTabChange("hotels")}
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 h-[35vh] rounded-box p-6"
        >
          <span>
            <FlightTab />
          </span>
        </div>
        {/* Third Tab */}
        <a
          href="https://www.wegopro.com/?utm_source=wego&utm_medium=web&utm_campaign=homepage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row justify-evely bg-[#9da08e] px-2 rounded-md items-center gap-1"
        >
          <PiAirplaneInFlightBold className="font-semibold text-blue-700" />{" "}
          <span className="font-semibold text-lg">WegoPro Business Travel</span>
        </a>
      </div>
    </div>
  );
};

export default SearchFormTab;
