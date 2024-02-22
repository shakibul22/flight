import React from "react";
import CheapestTab from "./CheapestTab";
import BaggageComponent from "./BaggageComponent";

const DataCard = ({ f }) => {
  const {
    tracking_id,
    flight_key,
    hold_possible,
    package_option,
    last_ticket_time,
    offer_id,
    routingIdentifier,
    search_parameter,
    pax_options,
    supplier,
    flight_group,
    price,
    sell,
    margin,
    price_breakdown,
    baggage,
    fare_rules,
    filter,
    filter_unique_filter_code,
    total_price,
    destination_reach_time,
    destination_reach_timestamp,
  } = f;
  const departureDepartureTime = new Date(filter.departure_departure_time);
  const formattedDepartureTime = departureDepartureTime.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  const departureArriavlTime = new Date(filter.arrival_departure_time);
  const formattedArrivalTime = departureArriavlTime.toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  console.log(tracking_id);
  return (
    <div>
      {/* {
        filter_data=="cheapest_flight"? <CheapestTab />:""
      } */}
      <div className="card lg:card-side mb-7 bg-base-100 shadow-xl">
        <div className="overflow-x-auto  flex flex-row justify-between gap-2">
          <table className="table w-[40vw] ">
            {/* head */}
            <thead className="bg-gray-300  px-4 py-2 ">
              <tr>
                <th>Airline</th>
                <th>Details</th>
                <th>Deparature</th>
                <th>Arrival</th>
                <th>Duration</th>
                <th>Baggage</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>
                  {flight_group.map((flight) => (
                    <div key={flight.routes[0].air_segment_key}>
                      {/* Displaying operating carrier logo */}
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`https://gtrs-airlineimages.s3.ap-southeast-1.amazonaws.com/icon/${flight.routes[0].operating.carrier_logo}`}
                        alt="Operating Carrier Logo"
                      />
                    </div>
                  ))}
                </th>
                <td>
                  {" "}
                  {flight_group.map((flight) => (
                    <div key={flight.routes[0].air_segment_key}>
                      {" "}
                      <p>
                        {flight.routes[0].operating.carrier}
                        {" -"}
                        {flight.routes[0].operating.flight_number}
                      </p>{" "}
                    </div>
                  ))}
                </td>
                <td>
                  <div>
                    {/* <p>{baggage[0].origin}</p> */}
                    <p> {formattedArrivalTime}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{baggage[0].destination} </p>
                    <p>
                      {baggage[0].destination_terminal}
                      {formattedDepartureTime}
                    </p>
                  </div>
                </td>
                <td>
                  {flight_group.map((flight, index) => (
                    <div key={index}>
                      <p> {flight.flight_time.substring(2)}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {flight_group.map((flight, index) => (
                    <div key={index}>
                      <p> {flight.flight_time.substring(2)}</p>
                    </div>
                  ))}
                </td>
              </tr>

              <tr className="bg-gray-100">
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {flight_group.map((flightGroup, index) => (
                    <div key={index}>
                      {flightGroup.routes.map((route, index) => (
                        <div key={index}>
                          {/* Display transit time if available */}
                          {route.transit_time && (
                            <p>Transit Time: {route.transit_time}</p>
                          )}
                        </div>
                      ))}
                      {/* Add more flight group details if necessary */}
                    </div>
                  ))}
                </td>

                <td></td>
                <td></td>
              </tr>
              <tr className="">
                <th>
                  {flight_group.map((flight) => (
                    <div key={flight.routes[0].air_segment_key}>
                      {/* Displaying operating carrier logo */}
                      <img
                        className="w-10 h-10 rounded-full"
                        src={`https://gtrs-airlineimages.s3.ap-southeast-1.amazonaws.com/icon/${flight.routes[0].operating.carrier_logo}`}
                        alt="Operating Carrier Logo"
                      />
                    </div>
                  ))}
                </th>
                <td>
                  {" "}
                  {flight_group.map((flight) => (
                    <div key={flight.routes[0].air_segment_key}>
                      {" "}
                      <p>
                        {flight.routes[0].operating.carrier}
                        {" -"}
                        {flight.routes[0].operating.flight_number}
                      </p>{" "}
                    </div>
                  ))}
                </td>
                <td>
                  <div>
                    <p>{baggage[0].origin}</p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>{baggage[0].destination} </p>
                    <p>{baggage[0].destination_terminal}</p>
                  </div>
                </td>
                <td>
                  {flight_group.map((flight, index) => (
                    <div key={index}>
                      <p> {flight.flight_time.substring(2)}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {flight_group.map((flight, index) => (
                    <div key={index}>
                      <p> {flight.flight_time.substring(2)}</p>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
          <h3 className="flex justify-center items-center ml-9 text-center">
            {total_price}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DataCard;
