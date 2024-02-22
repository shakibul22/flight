import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { IoWomanOutline } from "react-icons/io5";
import { IoMan } from "react-icons/io5";
import { FaBaby } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function DropDown() {
  const [selectedPaymentTypes, setSelectedPaymentTypes] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 0,
    children: 0,
    infant: 0,
  });
  const [passengerLabel, setPassengerLabel] = useState("Passengers");
  const [isApplyClicked, setIsApplyClicked] = useState(false); // State to track if apply button is clicked

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

  const paymentTypes = [
    { id: 1, name: "American Express" },
    { id: 2, name: "Visa" },
    { id: 3, name: "Mastercard" },
    { id: 4, name: "Dinnercard" },
    { id: 5, name: "Master Card debit" },
    { id: 6, name: "Master Card credit" },
    { id: 7, name: "Bank Transfer" },
  ];

  const handlePaymentTypeChange = (event, type) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedPaymentTypes([...selectedPaymentTypes, type]);
    } else {
      setSelectedPaymentTypes(
        selectedPaymentTypes.filter((selectedType) => selectedType !== type)
      );
    }
  };

  const isGreen =
    passengerCounts.adult + passengerCounts.children + passengerCounts.infant <
    9;

  return (
    <div className="flex flex-row justify-between gap-9">
      <div className="flex flex-row gap-4  mr-5 items-center">
        <input type="checkbox" name="right" id="" />
        <span>Direct Flight </span>
      </div>
      <div className="flex flex-row justify-evenly gap-5">
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
                        e.stopPropagation(); // Prevent the event from bubbling up and closing the menu
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
                        e.stopPropagation(); // Prevent the event from bubbling up and closing the menu
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

        {/* Travel Class */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="travel-class-label">Travel Class</InputLabel>
            <Select
              labelId="travel-class-label"
              id="travel-class-select"
              autoWidth
              label="Travel Class"
              variant="standard"
            >
              <MenuItem value={10}>Premium Economy</MenuItem>
              <MenuItem value={21}>Business Class</MenuItem>
              <MenuItem value={22}>First Class</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Payment Type */}
        <div>
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="payment-type-label">Payment Type</InputLabel>
            <Select
              labelId="payment-type-label"
              id="payment-type-select"
              multiple
              variant="standard"
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              onOpen={() => setIsMenuOpen(true)}
              value={selectedPaymentTypes}
              onChange={(event) =>
                handlePaymentTypeChange(event, event.target.value)
              }
              autoWidth
              label="Payment Type"
              renderValue={(selected) => `${selected.length} selected`}
            >
              <p className="w-[40vh] p-5">
                By Selecting One Or More (Max 10) Payment Types, Prices On Wego
                Will Include Applicable Minimum Payment Fee. Please Note That
                Not All Providers Support All Payment Types.
              </p>
              <div className="grid grid-cols-2">
                {paymentTypes.map((type) => (
                  <div key={type.id} className="">
                    <MenuItem>
                      <input
                        type="checkbox"
                        checked={selectedPaymentTypes.includes(type.name)}
                        onChange={(event) =>
                          handlePaymentTypeChange(event, type.name)
                        }
                      />
                      <span className="ml-2">{type.name}</span>
                    </MenuItem>
                  </div>
                ))}
              </div>

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
    </div>
  );
}
