import { useContext, useEffect, useState } from "react";
import Filter from "../Components/Filter";
import DataCard from "../Components/DataCard";
import ToInputModal from "../Components/ToInputModal";
import DatePickers from "../Components/DatePicker";
import { MdSwapHoriz } from "react-icons/md";
import InputModal from "../Components/InputModal";
import { getAllOneWay } from "../Actions/airport";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createContextProvider } from "../Context/Context";
import Multicity from "../Components/Multicity";
import { FaSearchengin } from "react-icons/fa6";

const FlightSearch = () => {
  const [activeTab, setActiveTab] = useState("oneWay");
  const { data, setData } = useContext(createContextProvider);
  const {
    travelClass,
    setTravelClass,
    selectedBaggages,
    selectedAirlines,
    priceFilter,
    stop,
    selectedCityCode,
    returnPlaceholder,
    selectedCityCode1,
    departurePlaceholder,
  } = useContext(createContextProvider);
  const [filterData, setFilteredData] = useState(data);
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const handleTravelClassChange = (event) => {
    setTravelClass(event.target.value);
  };
  useEffect(() => {
    if (priceFilter) {
      const filtered = data.filter(
        (flight) => Math.floor(flight.total_price) === priceFilter
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [priceFilter, data]);

  useEffect(() => {
    if (selectedBaggages && selectedBaggages.length > 0) {
      const filtered = data.filter((flight) =>
        flight.flight_group.some(
          (segment) =>
            segment?.routes[0]?.baggages?.checked?.ADT?.title ===
            selectedBaggages
        )
      );

      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedBaggages, data]);

  useEffect(() => {
    if (stop && stop.length > 0) {
      const filtered = data.filter((flight) =>
        flight.flight_group.some((segment) =>
          stop.includes(segment.no_of_stops_title)
        )
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [stop, data]);

  useEffect(() => {
    const filtered = data.filter((flight) =>
      flight.flight_group.some(
        (segment) => selectedAirlines[segment?.airline_name]
      )
    );
    setFilteredData(filtered);
  }, [selectedAirlines, data]);
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
    }
  };

  return (
    <div>
      <div className="pt-16 px-[220px]">
        <div className="shadow-xl h-auto p-9">
          {/* Tabs for One Way, Round Trip, and Multi-City */}
          <div className="flex justify-start items-center gap-2 px-[230px]">
            <button
              className={`flex justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl ${
                activeTab === "oneWay" ? "bg-green-400" : ""
              }`}
              onClick={() => handleTabChange("oneWay")}
            >
              One-way
            </button>
            <button
              className={`flex justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl ${
                activeTab === "roundTrip" ? "bg-green-400" : ""
              }`}
              onClick={() => handleTabChange("roundTrip")}
            >
              Round-Trip
            </button>
            <button
              className={`flex justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl ${
                activeTab === "multiCity" ? "bg-green-400" : ""
              }`}
              onClick={() => handleTabChange("multiCity")}
            >
              Multi-city
            </button>
            <div>
              <FormControl sx={{ m: 1, minWidth: 180 }}>
                <Select
                  autoWidth
                  variant="standard"
                  value={travelClass} // Controlled component
                  onChange={handleTravelClassChange} // Event handler
                >
                  {/* Add an empty option to allow removing the selection */}
                  <MenuItem defaultValue="Travel Class">Travel Class</MenuItem>
                  <MenuItem value="Economy">Economy</MenuItem>
                  <MenuItem value="Premium-Economy">Premium Economy</MenuItem>
                  <MenuItem value="Business">Business Class</MenuItem>
                  <MenuItem value="First-Class">First Class</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          {/* Content based on the active tab */}
          {activeTab === "oneWay" && (
            // Content for One Way
            <div className="px-[250px] mt-5">
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
                  } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[198px] mt-2 overflow-auto rounded-full border-gray-400 border-4`}
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
          {activeTab === "roundTrip" && (
            // Content for Round Trip
            <div className="px-[250px] mt-5">
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
                  } z-10 absolute transform translate-x-[175px] md:translate-x-[170px] 2xl:translate-x-[198px] mt-2 overflow-auto rounded-full border-gray-400 border-4`}
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
              className=" bg-[#bb2a2f] flex flex-row py-3 text-white justify-evenly gap-2 rounded items-center px-8 mt-7 "
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
