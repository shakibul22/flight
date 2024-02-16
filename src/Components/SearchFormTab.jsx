import FlightTab from "./FlightTab";
import { PiAirplaneInFlightBold } from "react-icons/pi";

const SearchFormTab = () => {
  return (
    <div className="">
      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-semibold text-lg border-2"
          aria-label="Flights"
          checked
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-100 rounded-box p-6"
        >
          <span>
            <FlightTab />
          </span>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab font-semibold text-lg border-2"
          aria-label="Hotels"
        />
        <div
          role="tabpanel"
          className="tab-content bg-white border-base-300 rounded-box p-6"
        >
          <span> Tab content</span>
        </div>
        <a
          href="https://www.wegopro.com/?utm_source=wego&utm_medium=web&utm_campaign=homepage"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-row justify-evely items-center gap-1"
        >
          <PiAirplaneInFlightBold className="font-semibold text-blue-700" />{" "}
          <span className="font-semibold text-lg">WegoPro Business Travel</span>
        </a>
      </div>
    </div>
  );
};

export default SearchFormTab;
