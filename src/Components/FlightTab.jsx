import React, { useState } from "react";
import { MdSwapHoriz } from "react-icons/md";
import InputModal from "./InputModal";
import ToInputModal from "./ToInputModal";
import DatePicker from "./DatePicker";
const FlightTab = () => {
  const [activeTab, setActiveTab] = useState("roundTrip"); // Set default active tab

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSwap = () => {
    const temp = input1;
    setInput1(input2);
    setInput2(temp);
  };
  return (
    <div>
      <div role="tablist" className="tabs ">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab ${
            activeTab === "oneWay"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50 text-lg"
          }`}
          aria-label="One-way"
          onClick={() => handleTabChange("oneWay")}
        />
        <div role="tabpanel" className="tab-content p-5">
          <div className="flex justify-start gap-4 items-center">
            <InputModal />
            <button
              onClick={handleSwap}
              className="z-10 absolute transform translate-x-48 overflow-auto"
            >
              <label className="btn   btn-circle  swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" />

                {/* hamburger icon */}
                <MdSwapHoriz className="text-xl swap-off" />

                {/* close icon */}
                <MdSwapHoriz className="text-xl swap-on" />
              </label>
            </button>{" "}
            {/* Arrow button */}
            <ToInputModal />
      <DatePicker />

          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab ${
            activeTab === "roundTrip"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50  text-lg"
          }`}
          aria-label="Round-trip"
          defaultChecked
          onClick={() => handleTabChange("roundTrip")}
        />
        <div role="tabpanel" className="tab-content p-5 ">
          Round-trip
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab ${
            activeTab === "multiCity"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50  text-lg"
          }`}
          aria-label="Multi-city"
          onClick={() => handleTabChange("multiCity")}
        />
        <div role="tabpanel" className="tab-content p-5">
          Multi-city
        </div>
      </div>
    </div>
  );
};

export default FlightTab;
