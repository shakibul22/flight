import { useContext, useState } from "react";
import { MdSwapHoriz } from "react-icons/md";
import DatePicker from "./DatePicker";
import InputModal from "./InputModal";
import ToInputModal from "./ToInputModal";
// import { getAllAirports } from "../Actions/airport"
import DropDown from "./DropDown";
import Multicity from "./Multicity";
import { createContextProvider } from "../Context/Context";
import { Link, useNavigate } from "react-router-dom";

import { getAllOneWay } from "../Actions/airport";
import FlightSearch from "../Pages/FlightSearch";
import DatePickers from "./DatePicker";
const FlightTab = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const {
    selectedCityCode,
    returnPlaceholder,
    selectedCityCode1,
    departurePlaceholder,
  } = useContext(createContextProvider);

  const { setData } = useContext(createContextProvider);
  const history = useNavigate();

  const [activeTab, setActiveTab] = useState("OneWay"); // Set default active tab
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
  const handleSearch = async () => {
    const data = {
      journey_type: { activeTab },
      segment: [
        {
          departure_airport_type: "AIRPORT",
          departure_airport: selectedCityCode,
          arrival_airport_type: "AIRPORT",
          arrival_airport: selectedCityCode1,
          departure_date: departurePlaceholder,
        },
      ],
      travelers_adult: 1,
      travelers_child: 0,
      travelers_child_age: 0,
      travelers_infants: 0,
      travelers_infants_age: [""],
      preferred_carrier: [null],
      non_stop_flight: "any",
      baggage_option: "any",
      booking_class: "Economy",
      supplier_uid: "all",
      partner_id: "",
      language: "en",
    };
    try {
      const res = await getAllOneWay(data);

      setData(res.data);
      history({
        pathname: "/flightSearch",
        state: { searchData: res.data },
      });
    } catch (error) {
      console.error("Error handling one-way search:", error);
    }
  };

  return (
    <div className="h-60">
      <div role="tablist" className="tabs ">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab ${
            activeTab === "OneWay"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50 text-lg"
          }`}
          aria-label="One-way"
          onClick={() => handleTabChange("OneWay")}
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
              } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[207px] mt-2 overflow-auto rounded-full border-gray-400 border-4`}
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
              <DatePickers
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
              />
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className={`tab ${
            activeTab === "RoundTrip"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50  text-lg"
          }`}
          aria-label="Round-trip"
          defaultChecked
          onClick={() => handleTabChange("RoundTrip")}
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
              } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[220px] overflow-auto 
              rounded-full border-2 border-black translate-y-1 h-15 w-15 `}
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
            activeTab === "Multicity"
              ? "bg-[#e7fddc] text-[#309736] z-20 font-medium rounded-xl mr-2  text-lg "
              : "text-black font-medium rounded-xl mr-2 bg-gray-300/50  text-lg"
          }`}
          aria-label="Multi-city"
          onClick={() => handleTabChange("Multicity")}
        />
        <div role="tabpanel" className="tab-content p-5">
          <Multicity />
        </div>
        
      </div>
      <div className="flex  justify-evenly">
        <DropDown />{" "}
        <Link to="/flightSearch">
          <button
            onClick={handleSearch}
            type="button"
            className="btn btn-success px-8 "
          >
            Search
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FlightTab;
