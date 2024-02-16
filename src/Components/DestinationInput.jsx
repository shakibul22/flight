import React, { useState } from "react";

const defaultDestinations = [
  "New York",
  "Los Angeles",
  "London",
  "Paris",
  "Tokyo",
];

function DestinationInput() {
  const [inputValue, setInputValue] = useState("");
  const [similarDestinations, setSimilarDestinations] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Filter similar destinations based on input value
    const similar = defaultDestinations.filter((destination) =>
      destination.toLowerCase().includes(value.toLowerCase())
    );
    setSimilarDestinations(similar);
  };

  const handleDestinationClick = (destination) => {
    // Add selected destination to the list
    setSelectedDestinations([...selectedDestinations, destination]);
    // Clear input field and similar destinations list
    setInputValue("");
    setSimilarDestinations([]);
  };

  const handleRemoveDestination = (index) => {
    const updatedDestinations = [...selectedDestinations];
    updatedDestinations.splice(index, 1);
    setSelectedDestinations(updatedDestinations);
  };

  const handleInputFocus = () => {
    setIsZoomed(true);
  };

  return (
    <div className={`input-container ${isZoomed ? "zoomed" : ""}`}>
      <div>
        {selectedDestinations.map((destination, index) => (
          <span key={index} style={{ marginRight: "5px" }}>
            {destination}{" "}
            <button onClick={() => handleRemoveDestination(index)}>
              Remove
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        placeholder="Enter destination"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
      />
      <ul>
        {similarDestinations.map((destination, index) => (
          <li key={index} onClick={() => handleDestinationClick(destination)}>
            {destination}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DestinationInput;
