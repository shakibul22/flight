// BaggageComponent.js
import React from "react";

const BaggageComponent = ({ baggage }) => {
//   console.log(baggage);
  return (
    <div className="baggage">
      <div>Baggage Details:</div>
      
      {baggage.map((item, index) => (
        <div key={index}>
          <div>Passenger Type: {item.passenger_type}</div>
          <div>Origin: {item.origin}</div>
          <div>Destination: {item.destination}</div>
          <div>Baggage Type: {item.baggage_type}</div>
          {/* Render more baggage details as needed */}
        </div>
      ))}
    </div>
  );
};

export default BaggageComponent;
