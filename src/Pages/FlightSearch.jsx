import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { BsArrowRepeat } from "react-icons/bs";
import { TbArrowRampRight } from "react-icons/tb";
import { MdOutlineArrowDropDown, MdSwapHoriz } from "react-icons/md";
import Passenger from "../Components/Passenger";
import InputModal from "../Components/InputModal";
import ToInputModal from "../Components/ToInputModal";
import Deparature from "../Components/Deparature";
import { useContext, useEffect, useState } from "react";
import Filter from "../Components/Filter";
import { getAllOneWay } from "../Actions/airport";
import DataCard from "../Components/DataCard";

import { createContextProvider } from "../Context/Context";

const FlightSearch = () => {
  // const [oneWay, setOneWay] = useState([]);
  const [cities, setCities] = useState([{ input1: "", input2: "" }]);
  const { data } = useContext(createContextProvider);
  // const input = useDispatch();
  // const { inputs } = useSelector((state) => state);

  // useEffect(() => {
  //   handleOnWay();
  // }, []);

  // const handleOnWay = async () => {
  //   try {
  //     const res = await getAllOneWay();
  //     setOneWay(res.data);
  //   } catch (error) {
  //     console.error("Error handling one-way search:", error);
  //   }
  // };

  const addFlight = () => {
    setCities([...cities, { input1: "", input2: "" }]);
  };

  const removeFlight = (index) => {
    const newCities = [...cities];
    newCities.splice(index, 1);
    setCities(newCities);
  };

  const handleSwap = (index) => {
    const newCities = [...cities];
    const temp = newCities[index].input1;
    newCities[index].input1 = newCities[index].input2;
    newCities[index].input2 = temp;
    setCities(newCities);
  };

  const handleInputChange = (index, inputType, value) => {
    const newCities = [...cities];
    newCities[index][inputType] = value;
    setCities(newCities);
    // Call search function here passing the updated cities
    // search(newCities);
  };

  // Implement your search function here
  const search = (cities) => {
    // Perform search based on the cities input
    // You can make an API call here passing the cities data
  };

  console.log(data);
  // const handleRoundTrip = async () => {
  //   try {
  //     const res = await getRoundTrip(); // Await the Promise
  //     setOneWay(res.data); // Use res directly, it's already the response data
  //     // Handle the response data as needed
  //   } catch (error) {
  //     console.error("Error handling one-way search:", error);
  //     // Handle the error,
  //   }
  // };
  // const handleMulticity = async () => {
  //   try {
  //     const res = await getMulticity(); // Await the Promise
  //     setOneWay(res.data); // Use res directly, it's already the response data
  //     // Handle the response data as needed
  //   } catch (error) {
  //     console.error("Error handling one-way search:", error);
  //     // Handle the error,
  //   }
  // };
  // Example usage:
  return (
    <div>
      <div className="pt-16 px-[220px]  ">
        <div className="shadow-xl h-auto p-9">
          <div className="  flex px-16 justify-evenly items-center gap-4 ">
            <button className="flex  justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl">
              <FaRegArrowAltCircleRight className="text-white" />
              <span className="text-red-800"> One-way</span>
            </button>
            <button className="flex  justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl">
              <BsArrowRepeat className="text-white" />
              <span className="text-red-800"> Round-Trip</span>
            </button>
            <button className="flex  justify-evenly items-center gap-2 px-6 py-1 bg-gray-100 hover:bg-gray-300 rounded-2xl">
              <TbArrowRampRight className="text-white" />
              <span className="text-red-800"> Multi-city</span>
            </button>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="flex  m-1">
                Any Flight <MdOutlineArrowDropDown className="ml-2 text-xl" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>All Right</a>
                </li>
                <li>
                  <a>Non-stop</a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="flex  m-1">
                Any Baggage <MdOutlineArrowDropDown className="ml-2 text-xl" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a>Any Baggage</a>
                </li>
                <li>
                  <a>With Baggage</a>
                </li>
              </ul>
            </div>
            <div>
              <Passenger />
            </div>
            <div className="dropdown">
              <div tabIndex={0} role="button" className="flex  m-1">
                Economy <MdOutlineArrowDropDown className="ml-2 text-xl" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100w-52"
              >
                <li>
                  <a>Economy</a>
                </li>
                <li>
                  <a>Premium Economy</a>
                </li>
                <li>
                  <a>Business Class</a>
                </li>
                <li>
                  <a>First Class</a>
                </li>
              </ul>
            </div>
          </div>
          <div className=" w-full px-[300px]">
            
            {cities.map((city, index) => (
              <div
                className="multicity flex justify-start gap-2 items-center"
                key={index}
              >
                <div className="w-full relative mr-2">
                  <InputModal
                    inputValue={city.input1}
                    setInputValue={(value) =>
                      handleInputChange(index, "input1", value)
                    }
                  />
                </div>
                <button
                  onClick={() => handleSwap(index)}
                  className={`z-10 absolute transform  translate-x-[175px] md:translate-x-[150px]  2xl:translate-x-[222px]   overflow-auto rounded-full border-white border-4 ${
                    city.input1 && city.input2 ? "bg-green-400" : "bg-gray-200 "
                  }`}
                  disabled={!city.input1 || !city.input2}
                >
                  <MdSwapHoriz className="text-xs   text-gray-950 w-10 h-10  " />{" "}
                </button>
                {/* Arrow button */}
                <div className="w-full relative">
                  <ToInputModal
                    inputValue={city.input2}
                    setInputValue={(value) =>
                      handleInputChange(index, "input2", value)
                    }
                  />
                </div>
                <div className="w-full">
                  <Deparature />
                </div>
                {cities.length > 2 && (
                  <button
                    type="button"
                    className="btn btn-circle"
                    onClick={() => removeFlight(index)}
                  >
                    X
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="transform translate-x-12 absolute top-60 bg-green-400 px-3 py-2 border-2 rounded-md  right-72"
              onClick={addFlight}
            >
              + Add Flight
            </button>
          </div>
        </div>

        <div className="flex flex-row gap-7 my-5">
          <div className="w-[35vh] ">
            <Filter />
          </div>
          <div className="w-full  py-4 px-4 shadow-2xl  h-screen overflow-y-auto ">
            <div role="tablist" className="tabs tabs-bordered p-10">
              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-2xl font-bold mb-10  ml-[350px]"
                aria-label="Cheapest"
                checked
              />
              <div role="tabpanel" className="tab-content ">
                {data?.map((f) => (
                  <DataCard key={f._id} f={f} />
                ))}
              </div>

              <input
                type="radio"
                name="my_tabs_1"
                role="tab"
                className="tab text-2xl mb-10 font-bold"
                aria-label="Fastest"
              />
              <div role="tabpanel" className="tab-content p-10">
                {data?.map((f) => (
                  <DataCard key={f._id} f={f} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
