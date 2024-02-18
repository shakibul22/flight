import { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { IoWomanOutline, IoMan } from "react-icons/io5";
import { FaBaby } from "react-icons/fa";

export default function GuestRoom() {
  const [rooms, setRooms] = useState([{ adults: 1, children: 0 }]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomLabel, setRoomLabel] = useState("Rooms");

  const handleIncrement = (index, type) => {
    const updatedRooms = [...rooms];
    const room = updatedRooms[index];

    if (type === "adults" && room.adults < 9) {
      room.adults++;
    } else if (type === "children" && room.children < 4) {
      room.children++;
    }

    setRooms(updatedRooms);
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
    const totalRooms = rooms.length;
    setRoomLabel(`Rooms (${totalRooms})`);
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}></Button>
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="room-label">{roomLabel}</InputLabel>
        <Select
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
                  <IoMan className="text-2xl" />
                  <div className="flex flex-col">
                    <div>Room {index + 1}</div>
                    <div>Adults</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(index, "adults")}
                    disabled={room.adults === 1}
                    className={`px-2 rounded-l ${
                      room.adults === 1 ? "opacity-50" : ""
                    }`}
                  >
                    -
                  </button>
                  <span className="px-4">{room.adults}</span>
                  <button
                    onClick={() => handleIncrement(index, "adults")}
                    disabled={room.adults === 9}
                    className={`px-2 rounded-l ${
                      room.adults === 9 ? "opacity-50" : ""
                    }`}
                  >
                    -
                  </button>
                  <span className="px-4">{room.adults}</span>
                  <button
                    onClick={() => handleIncrement(index, "adults")}
                    disabled={room.adults === 9}
                    className={`px-2 rounded-r ${
                      room.adults === 9 ? "opacity-50" : ""
                    }`}
                  >
                    +
                  </button>
                </div>
                <div className="flex gap-2 justify-between items-center">
                  <IoWomanOutline className="text-2xl" />
                  <div className="flex flex-col">
                    <div>Children</div>
                    <div>2-12</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleDecrement(index, "children")}
                    disabled={room.children === 0}
                    className={`px-2 rounded-l ${
                      room.children === 0 ? "opacity-50" : ""
                    }`}
                  >
                    -
                  </button>
                  <span className="px-4">{room.children}</span>
                  <button
                    onClick={() => handleIncrement(index, "children")}
                    disabled={room.children === 9}
                    className={`px-2 rounded-r ${
                      room.children === 9 ? "opacity-50" : ""
                    }`}
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
