import FlightTab from "./FlightTab";
import { PiAirplaneInFlightBold } from "react-icons/pi";
import { useState } from "react";
import DatePicker from "./DatePicker";
import InputModal from "./InputModal";
import DropDown from "./DropDown";
import DestinationInput from "./DestinationInput";
import GuestRoom from "./GuestRoom";

const SearchFormTab = () => {
  const [activeTab, setActiveTab] = useState("flights");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  // const handleSwap = () => {
  //   const temp = input1;
  //   setInput1(input2);
  //   setInput2(temp);
  // };
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
          className="tab-content bg-white border-base-300  h-[30vh] rounded-box p-6"
        >
          <div className="w-[105vh]">
            <h2 className="font-medium mb-4">Where do you want to Stay?</h2>
            <div className="flex flex-row items-center">
              <div className="w-full relative mr-2 ">
                <InputModal inputValue={input1} setInputValue={setInput1} />
              </div>
              <div className="w-full">
                <DatePicker />
              </div>
              <div className="w-full">
                <GuestRoom />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center">
              <div className="flex gap-3">
                <input type="checkbox" name="free" id="" />
                <span>Free Collection</span>
              </div>
              <button className="btn btn-success text-white">Search</button>
            </div>
          </div>
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
