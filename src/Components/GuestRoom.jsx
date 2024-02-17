import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { MdPeople } from "react-icons/md";

export default function GuestRoom() {
  const [passengerCounts, setPassengerCounts] = useState({
    adult: 0,
    children: 0,
    infant: 0,
  });
  const [passengerLabel, setPassengerLabel] = useState("Passengers");
  const [selectedPassengers, setSelectedPassengers] = useState([]); // State to track selected passengers
  const [isApplyClicked, setIsApplyClicked] = useState(false); // State to track if apply button is clicked
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track if modal is open

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

  const handleSelectPassenger = (type, count) => {
    setSelectedPassengers((prevSelected) => {
      const index = prevSelected.findIndex((item) => item.type === type);
      if (index !== -1) {
        const updatedSelected = [...prevSelected];
        updatedSelected[index] = { type, count };
        return updatedSelected;
      } else {
        return [...prevSelected, { type, count }];
      }
    });
  };

  const handleApplyClick = () => {
    const updatedCounts = { ...passengerCounts };
    selectedPassengers.forEach(({ type, count }) => {
      updatedCounts[type] = count;
    });
    setPassengerCounts(updatedCounts);

    const totalPassengers =
      updatedCounts.adult + updatedCounts.children + updatedCounts.infant;
    setPassengerLabel(`Passengers (${totalPassengers})`);
    setIsApplyClicked(true); // Set apply button clicked
    setIsModalOpen(false); // Close the modal
  };

  const isGreen =
    passengerCounts.adult + passengerCounts.children + passengerCounts.infant <
    9;

  return (
    <div className="flex flex-row justify-evenly gap-5">
      <div className="flex flex-row justify-evenly gap-5">
        <FormControl sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="Passengers">{passengerLabel}</InputLabel>
          <Select
            className="flex flex-row justify-between gap-4"
            labelId="Passengers-label"
            id="Passengers-select"
            autoWidth
            label={passengerLabel}
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)} // Close modal on backdrop click
            onOpen={() => setIsModalOpen(true)} // Open modal when select is clicked
          >
            {/* Adult MenuItem */}
            <MenuItem key="adult">
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <MdPeople className="text-2xl" />
                  <div className="flex flex-col ">
                    Adults
                    <span> &gt;12</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement("adult")}
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
                    onClick={() => {
                      handleIncrement("adult");
                      handleSelectPassenger("adult", passengerCounts.adult + 1);
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
            <MenuItem key="children">
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <MdPeople className="text-2xl" />
                  <div className="flex flex-col ">
                    Children
                    <span> 2-12</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement("children")}
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
                    onClick={() => {
                      handleIncrement("children");
                      handleSelectPassenger(
                        "children",
                        passengerCounts.children + 1
                      );
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
            <MenuItem key="infant">
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between  items-center">
                  <MdPeople className="text-2xl" />
                  <div className="flex flex-col ">
                    Infants
                    <span> &lt;2</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement("infant")}
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
                    onClick={() => {
                      handleIncrement("infant");
                      handleSelectPassenger(
                        "infant",
                        passengerCounts.infant + 1
                      );
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
}
