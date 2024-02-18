import { useState } from "react";
import { MdSwapHoriz } from "react-icons/md";
import DatePicker from "./DatePicker";
import InputModal from "./InputModal";
import ToInputModal from "./ToInputModal";
// import { getAllAirports } from "../Actions/airport"
import DropDown from "./DropDown";
import Multicity from "./Multicity";
const FlightTab = () => {
  const [activeTab, setActiveTab] = useState("roundTrip"); // Set default active tab
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  const handleSwap = () => {
    if (input1 && input2) {
      const temp = input1;
      setInput1(input2);
      setInput2(temp);
    }
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
        <div role="tabpanel" className="tab-content w-[105vh]  p-5">
          <div className="flex justify-start gap-4 items-center">
            <div className="w-full relative mr-2">
              <InputModal inputValue={input1} setInputValue={setInput1} />
            </div>
            <button
              onClick={handleSwap}
              className={`${
                input1 && input2
                  ? "bg-green-500"
                  : "bg-gray-300 cursor-not-allowed"
              } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[220px] overflow-auto rounded-full border-white border-4`}
              disabled={!input1 || !input2}
            >
              <MdSwapHoriz className="text-xs  text-gray-950 w-10 h-10" />
            </button>

            {/* Arrow button */}
            <div className="w-full relative">
              {" "}
              <ToInputModal inputValue={input2} setInputValue={setInput2} />
            </div>
            <div className="w-full">
              <DatePicker />
            </div>
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
        <div role="tabpanel" className="tab-content  w-[105vh]  p-5 ">
          <div className="flex justify-start gap-4 items-center">
            <div className="w-full relative mr-2">
              <InputModal inputValue={input1} setInputValue={setInput1} />
            </div>
            <button
              onClick={handleSwap}
              className={`${
                input1 && input2
                  ? "bg-green-500"
                  : "bg-gray-300 cursor-not-allowed"
              } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[220px] overflow-auto rounded-full border-white border-4`}
              disabled={!input1 || !input2}
            >
              <MdSwapHoriz className="text-xs border-2  ring text-gray-950 w-10 h-10" />
            </button>
            {/* Arrow button */}
            <div className="w-full relative">
              {" "}
              <ToInputModal inputValue={input2} setInputValue={setInput2} />
            </div>
            <div className="w-full">
              <DatePicker />
            </div>
          </div>
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
          <Multicity />
        </div>
      </div>
      <div>
        <DropDown />
      </div>
    </div>
  );
};

export default FlightTab;
