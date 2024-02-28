import { useContext, useEffect, useState } from "react";
import Filter from "../Components/Filter";
import DataCard from "../Components/DataCard";
import ToInputModal from "../Components/ToInputModal";
import DatePickers from "../Components/DatePicker";
import { MdArrowDropDown, MdSwapHoriz } from "react-icons/md";
import InputModal from "../Components/InputModal";
import { getAllOneWay } from "../Actions/airport";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createContextProvider } from "../Context/Context";
import Multicity from "../Components/Multicity";
import { FaArrowAltCircleRight, FaSearchengin } from "react-icons/fa";

// Import the spinner image
import spinner from "/spinner.svg";
import { FaDropbox } from "react-icons/fa6";

const FlightSearch = () => {
  const [activeTab, setActiveTab] = useState("oneWay");
  const { data, setData } = useContext(createContextProvider);
  const {
    travelClass,
    setTravelClass,
    selectedBaggages,
    selectedAirlines,
    stop,
    selectedOption,
    priceFilter,
    selectedCityCode,
    returnPlaceholder,
    selectedTimingSlots,
    selectedCityCode1,
    departurePlaceholder,

    setSelectedOption,
  } = useContext(createContextProvider);
  const [filterData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [loading, setLoading] = useState(false); // State for loading status

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };
  const handleTravelClassChange = (event) => {
    setTravelClass(event.target.value);
  };

  useEffect(() => {
    let filtered = data;

    // Filter based on selected baggages
    if (selectedBaggages && selectedBaggages.length > 0) {
      filtered = filtered.filter((flight) =>
        flight.flight_group.some(
          (segment) =>
            segment?.routes[0]?.baggages?.checked?.ADT?.title ===
            selectedBaggages
        )
      );
    }

    // Filter based on stops
    if (stop && stop.length > 0) {
      filtered = filtered.filter((flight) =>
        flight.flight_group.some((segment) =>
          stop.includes(segment.no_of_stops_title)
        )
      );
    }
    // if (selectedTimingSlots) {
    //   filtered = filtered.filter(
    //     (flight) =>
    //       flight.filter &&
    //       flight.filter.departure_timing_slot === selectedTimingSlots
    //   );
    // }

    // if (priceFilter) {
    //   filtered = filtered.filter(
    //     (flight) => Math.floor(flight.total_price) === priceFilter
    //   );
    // }

    // Filter based on selected airlines
    // if (selectedAirlines && Object.keys(selectedAirlines).length > 0) {
    //   filtered = filtered.filter((flight) =>
    //     flight.flight_group.some(
    //       (segment) => selectedAirlines[segment?.airline_name]
    //     )
    //   );
    // }

    // Update the filtered data state
    setFilteredData(filtered);
  }, [selectedBaggages, stop, selectedAirlines, data]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSwap = () => {
    if (input1 && input2) {
      const temp = input1;
      setInput1(input2);
      setInput2(temp);
    }
  };

  const handleSearch = async () => {
    // Set loading to true before making the API call
    setLoading(true);

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
      booking_class: travelClass,
      supplier_uid: "all",
      partner_id: "",
      language: "en",
    };
    try {
      const res = await getAllOneWay(data);

      setData(res.data);
    } catch (error) {
      console.error("Error handling one-way search:", error);
    } finally {
      // Set loading to false after data retrieval, whether successful or not
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="pt-16 lg:px-[30px] 2xl:px-[220px]">
        <div className="shadow-xl h-auto p-6">
          {/* Tabs for One Way, Round Trip, and Multi-City */}
          <div className="flex justify-between items-center gap-2 px-[20px] lg:px-[210px]">
            <div className="flex justify-start items-center gap-2">
              <button
                className={`flex justify-evenly items-center gap-2 px-4 py-2 bg-gray-100 text-[#bd3236] border-2 hover:bg-[#f2e3e4] rounded-full ${
                  activeTab === "oneWay" ? "bg-gray-100 border-[#bd3236]" : ""
                }`}
                onClick={() => handleTabChange("oneWay")}
              >
                <FaArrowAltCircleRight className="bg-[#f2e3e4] text-[#bd3236]" />{" "}
                One-way
              </button>
              <button
                className={`flex justify-evenly items-center gap-2 px-4 py-2 bg-gray-100 text-[#bd3236] border-2 hover:bg-[#f2e3e4] rounded-full ${
                  activeTab === "roundTrip"
                    ? "bg-gray-100 border-[#bd3236]"
                    : ""
                }`}
                onClick={() => handleTabChange("roundTrip")}
              >
                Round-Trip
              </button>
              <button
                className={`flex justify-evenly items-center gap-2 px-4 py-2 bg-gray-100 text-[#bd3236] border-2 hover:bg-[#f2e3e4] rounded-full ${
                  activeTab === "multiCity"
                    ? "bg-gray-100 border-[#bd3236]"
                    : ""
                }`}
                onClick={() => handleTabChange("multiCity")}
              >
                Multi-city
              </button>
            </div>
            <div className="flex gap-3">
              <div>
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="m-1 flex gap-2 items-center"
                  >
                    {selectedOption}
                    <MdArrowDropDown className="text-xl" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    <li>
                      <a onClick={() => handleOptionChange("Any")}>
                        Any Flight
                      </a>
                    </li>
                    <li>
                      <a onClick={() => handleOptionChange("Non-Stop")}>
                        Non-Stop
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <FormControl sx={{ m: 1, minWidth: 180, borderBottom: "none" }}>
                  <Select
                    autoWidth
                    variant="standard"
                    value={travelClass} // Controlled component
                    onChange={handleTravelClassChange} // Event handler
                  >
                    <MenuItem disabled defaultValue="Travel Class">
                      Travel Class
                    </MenuItem>
                    <MenuItem value="Economy">Economy</MenuItem>
                    <MenuItem value="Premium-Economy">Premium Economy</MenuItem>
                    <MenuItem value="Business">Business Class</MenuItem>
                    <MenuItem value="First-Class">First Class</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>

          {/* Content based on the active tab */}
          {activeTab === "oneWay" && (
            // Content for One Way
            <div className="lg:px-[140px] 2xl:px-[250px] mt-8">
              <div className="flex justify-start gap-4 items-center">
                <div className="w-full relative mr-2">
                  <InputModal inputValue={input1} setInputValue={setInput1} />
                </div>
                <button
                  onClick={handleSwap}
                  className={`${
                    input1 && input2
                      ? "bg-green-500"
                      : "bg-[#f2e3e4] cursor-not-allowed"
                  } z-10 absolute transform translate-x-[175px] md:translate-x-[198px] 2xl:translate-x-[204px] mt-2 overflow-auto rounded-full border-gray-100 border-2`}
                  disabled={!input1 || !input2}
                >
                  <MdSwapHoriz className="text-xs  text-gray-600 w-10 h-10" />
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
          )}
          {activeTab === "roundTrip" && (
            // Content for Round Trip
            <div className="lg:px-[140px] 2xl:px-[250px] mt-5">
              <div className="flex justify-start gap-4 items-center">
                <div className="w-full relative mr-2">
                  <InputModal inputValue={input1} setInputValue={setInput1} />
                </div>
                <button
                  onClick={handleSwap}
                  className={`${
                    input1 && input2
                      ? "bg-green-500"
                      : "bg-[#f2e3e4] cursor-not-allowed"
                  } z-10 absolute transform translate-x-[175px] md:translate-x-[198px] 2xl:translate-x-[204px] mt-2 overflow-auto rounded-full border-gray-100 border-2`}
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
          )}
          {activeTab === "multiCity" && (
            // Content for Multi-City
            <div className="flex justify-center items-center mt-5">
              <Multicity />
            </div>
          )}

          {/* Additional content */}
          <div className="max-w-xl mx-auto transform translate-y-12 px-[300px]">
            <button
              onClick={handleSearch}
              type="button"
              className=" bg-[#bb2a2f] flex flex-row py-6 text-xl font-serif text-white justify-evenly gap-2 rounded items-center px-8 mt-7 "
            >
              <FaSearchengin />
              <span> Search</span>
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-7 my-5">
          {/* Filter component */}
          <div className="w-[25vw]">
            <Filter />
          </div>
          {/* Data display */}
          <div className="w-full py-4 px-4 shadow-2xl h-screen  overflow-y-auto">
            {loading ? ( // Conditionally render spinner if loading is true
              <div className="flex justify-center items-center h-full">
                <img src={spinner} alt="Loading..." />
              </div>
            ) : (
              <div role="tablist" className="tabs tabs-bordered">
                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab ml-[25vw]"
                  aria-label="Cheapest"
                />
                <div role="tabpanel" className="tab-content p-10">
                  {" "}
                  {filterData && filterData.length > 0
                    ? filterData?.map((f) => <DataCard key={f._id} f={f} />)
                    : data?.map((f) => <DataCard key={f._id} f={f} />)}
                </div>

                <input
                  type="radio"
                  name="my_tabs_1"
                  role="tab"
                  className="tab"
                  aria-label="Fastest"
                  checked
                />
                <div role="tabpanel" className="tab-content p-10">
                  {filterData && filterData.length > 0
                    ? filterData?.map((f) => <DataCard key={f._id} f={f} />)
                    : data?.map((f) => <DataCard key={f._id} f={f} />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
