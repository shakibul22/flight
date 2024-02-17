import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { MdPeople } from "react-icons/md";

export default function GuestRoom() {
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomLabel, setRoomLabel] = useState("Rooms"); // State to track the room label

  const handleIncrement = (index, type) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [type]: updatedRooms[index][type] + 1,
      };
      return updatedRooms;
    });
  };

  const handleDecrement = (index, type) => {
    setRooms((prevRooms) => {
      const updatedRooms = [...prevRooms];
      updatedRooms[index] = {
        ...updatedRooms[index],
        [type]: Math.max(updatedRooms[index][type] - 1, 0),
      };
      return updatedRooms;
    });
  };

  const handleAddRoom = () => {
    setRooms((prevRooms) => [...prevRooms, { adults: 1, children: 0 }]);
  };

  const handleRemoveRoom = (indexToRemove) => {
    if (rooms.length > 1) {
      setRooms((prevRooms) =>
        prevRooms.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const handleApplyClick = () => {
    const totalRooms = rooms.length; // Calculate total rooms
    setRoomLabel(`Rooms (${totalRooms})`); // Update the room label
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="flex flex-row justify-evenly gap-5">
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="room-label">{roomLabel}</InputLabel>
        <Select
          className="flex flex-row justify-between gap-4"
          labelId="room-label"
          id="room-select"
          autoWidth
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onOpen={() => setIsModalOpen(true)}
        >
          {rooms.map((room, index) => (
            <MenuItem key={index}>
              <div className="flex justify-between gap-9">
                <div className="flex gap-2 justify-between items-center">
                  <MdPeople className="text-2xl" />
                  <div className="flex flex-col ">Room {index + 1}</div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(index, "adults")}
                    disabled={room.adults === 1}
                    className={`px-2 rounded-l`}
                  >
                    -
                  </button>
                  <span className="px-4">{room.adults}</span>
                  <button
                    onClick={() => handleIncrement(index, "adults")}
                    className={`px-2 rounded-r`}
                  >
                    +
                  </button>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(index, "children")}
                    disabled={room.children === 0}
                    className={`px-2 rounded-l`}
                  >
                    -
                  </button>
                  <span className="px-4">{room.children}</span>
                  <button
                    onClick={() => handleIncrement(index, "children")}
                    className={`px-2 rounded-r`}
                  >
                    +
                  </button>
                </div>
                <Button
                  variant="contained"
                  onClick={() => handleRemoveRoom(index)}
                >
                  Remove
                </Button>
              </div>
            </MenuItem>
          ))}
          <MenuItem>
            <Button variant="contained" onClick={handleAddRoom}>
              Add Room
            </Button>
          </MenuItem>
          <MenuItem>
            <Button variant="contained" onClick={handleApplyClick}>
              Apply
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
