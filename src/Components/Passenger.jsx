import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { IoWomanOutline } from "react-icons/io5";
import { IoMan } from "react-icons/io5";
import { FaBaby } from "react-icons/fa6";

const Passenger = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 0,
    children: 0,
    infant: 0,
  });
  const [passengerLabel, setPassengerLabel] = useState("Passengers");
  const [isApplyClicked, setIsApplyClicked] = useState(false); // State to track if apply button is clicked

  console.log(passengerCounts)
  const handleIncrement = (type) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  };

  const handleDecrement = (type) => {
    setPassengerCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] > 0 ? prevCounts[type] - 1 : 0,
    }));
  };

  const handleApplyClick = () => {
    const totalPassengers =
      passengerCounts.adult + passengerCounts.children + passengerCounts.infant;
    setPassengerLabel(`Passengers (${totalPassengers})`);
    setIsMenuOpen(false); // Close the dropdown menu after applying
    setIsApplyClicked(true); // Set apply button clicked
  };

  // console.log(passengerCounts);

  const isGreen =
    passengerCounts.adult + passengerCounts.children + passengerCounts.infant <
    9;
  return (
    <div>
      <div>
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="Passengers">{passengerLabel}</InputLabel>
          <Select
            labelId="Passengers-label"
            id="Passengers-select"
            autoWidth
            label={passengerLabel}
            variant="standard"
          >
            {/* Adult MenuItem */}
            <MenuItem>
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <IoMan className="text-2xl" />
                  <div className="flex flex-col ">
                    Adults
                    <span> &gt;12</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement("adult");
                    }}
                    disabled={passengerCounts.adult === 0}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-l`}
                  >
                    -
                  </button>

                  <span className="px-4">{passengerCounts.adult}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement("adult");
                    }}
                    disabled={passengerCounts.adult === 9 || !isGreen}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200"
                    } rounded-r`}
                  >
                    +
                  </button>
                </div>
              </div>
            </MenuItem>
            {/* Children MenuItem */}
            <MenuItem>
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <IoWomanOutline className="text-2xl" />
                  <div className="flex flex-col ">
                    Children
                    <span> 2-12</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement("children");
                    }}
                    disabled={passengerCounts.children === 0}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-l`}
                  >
                    -
                  </button>

                  <span className="px-4">{passengerCounts.children}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement("children");
                    }}
                    disabled={passengerCounts.children === 9 || !isGreen}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200"
                    } rounded-r`}
                  >
                    +
                  </button>
                </div>
              </div>
            </MenuItem>
            {/* Infants MenuItem */}
            <MenuItem>
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <FaBaby className="text-2xl" />
                  <div className="flex flex-col ">
                    Infants
                    <span> &lt;2</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecrement("infant");
                    }}
                    disabled={passengerCounts.infant === 0}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-l`}
                  >
                    -
                  </button>

                  <span className="px-4">{passengerCounts.infant}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncrement("infant");
                    }}
                    disabled={passengerCounts.infant === 9 || !isGreen}
                    className={`px-2 ${
                      isGreen
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-200"
                    } rounded-r`}
                  >
                    +
                  </button>
                </div>
              </div>
            </MenuItem>
            {/* Apply Button */}
            {!isApplyClicked && ( // Render apply button only if not clicked
              <MenuItem>
                <Button variant="contained" onClick={handleApplyClick}>
                  Apply
                </Button>
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
  
    </div>
  );
};

export default Passenger;
